import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { readFile } from "@babel/helper-fixtures";
import path from "node:path";
import { createHash } from "node:crypto";
import type { ChildProcess } from "node:child_process";
import { spawn } from "node:child_process";

export type ProcessTestOpts = {
  args: string[];
  executor?: string;
  ipc?: boolean;
  ipcMessage?: string;
  stdout?: string;
  stderr?: string;
  stdin?: string;
  stdoutPath?: string;
  stderrPath?: string;
  stdoutContains?: boolean;
  stderrContains?: boolean;
  testLoc?: string;
  outFiles?: Record<string, string>;
  inFiles?: Record<string, string>;
  noBabelrc?: boolean;
  minNodeVersion?: number;
  env?: Record<string, string>;
  BABEL_9_BREAKING?: boolean;
};

export type ProcessTest = {
  suiteName: string;
  testName: string;
  skip: boolean;
  fn: Function;
  opts: ProcessTestOpts;
  binLoc?: string;
};

export type ProcessTestBeforeHook = (test: ProcessTest, tmpDir: string) => void;
export type ProcessTestAfterHook = (
  test: ProcessTest,
  tmpDir: string,
  stdout: string,
  stderr: string,
) => {
  stdout: string;
  stderr: string;
};

const dirname = import.meta.dirname;

// https://github.com/nodejs/node/issues/11422#issue-208189446
const tmpDir = realpathSync(tmpdir());

const readDir = function (loc: string, pathFilter: (arg0: string) => boolean) {
  const files: Record<string, string> = {};
  if (existsSync(loc)) {
    readdirSync(loc, { withFileTypes: true, recursive: true })
      .filter(dirent => dirent.isFile() && pathFilter(dirent.name))
      .forEach(dirent => {
        const fullpath = path.join(dirent.parentPath, dirent.name);
        files[path.relative(loc, fullpath)] = readFile(fullpath);
      });
  }

  return files;
};

const outputFileSync = function (filePath: string, data: string) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, data);
};

function deleteDir(path: string): void {
  rmSync(path, { force: true, recursive: true });
}

const pathFilter = function (x: string) {
  return path.basename(x) !== ".DS_Store";
};

const assertTest = function (
  stdout: string,
  stderr: string,
  ipcMessage: unknown,
  opts: ProcessTestOpts,
  tmpDir: string,
) {
  const expectStderr = opts.stderr.trim();
  stderr = stderr.trim();

  try {
    if (opts.stderr) {
      if (opts.stderrContains) {
        expect(stderr).toContain(expectStderr);
      } else {
        expect(stderr).toBe(expectStderr);
      }
    } else if (stderr) {
      throw new Error("stderr:\n" + stderr);
    }
  } catch (e) {
    if (!process.env.OVERWRITE) throw e;
    console.log(`Updated test file: ${opts.stderrPath}`);
    outputFileSync(opts.stderrPath, stderr + "\n");
  }

  const expectStdout = opts.stdout.trim();
  stdout = stdout.trim();
  stdout = stdout.replace(/\\/g, "/");

  try {
    if (opts.stdout) {
      if (opts.stdoutContains) {
        expect(stdout).toContain(expectStdout);
      } else {
        expect(stdout).toBe(expectStdout);
      }
    } else if (stdout) {
      throw new Error("stdout:\n" + stdout);
    }
  } catch (e) {
    if (!process.env.OVERWRITE) throw e;
    console.log(`Updated test file: ${opts.stdoutPath}`);
    outputFileSync(opts.stdoutPath, stdout + "\n");
  }

  if (opts.ipc) {
    expect(ipcMessage).toEqual(opts.ipcMessage);
  }

  if (opts.outFiles) {
    const actualFiles = readDir(tmpDir, pathFilter);

    Object.keys(actualFiles).forEach(function (filename) {
      try {
        if (
          // saveInFiles always creates an empty .babelrc, so lets exclude for now
          filename !== ".babelrc" &&
          filename !== ".babelignore" &&
          !Object.hasOwn(opts.inFiles, filename)
        ) {
          const expected = opts.outFiles[filename];
          const actual = actualFiles[filename];

          expect(actual).toBe(expected || "");
        }
      } catch (e) {
        if (!process.env.OVERWRITE) {
          e.message += "\n at " + filename;
          throw e;
        }
        const expectedLoc = path.join(opts.testLoc, "out-files", filename);
        console.log(`Updated test file: ${expectedLoc}`);
        outputFileSync(expectedLoc, actualFiles[filename]);
      }
    });

    Object.keys(opts.outFiles).forEach(function (filename) {
      expect(actualFiles).toHaveProperty([filename]);
    });
  }
};

export function buildParallelProcessTests(name: string, tests: ProcessTest[]) {
  return function (curr: number, total: number) {
    const sliceLength = Math.ceil(tests.length / total);
    const sliceStart = curr * sliceLength;
    const sliceEnd = sliceStart + sliceLength;
    const testsSlice = tests.slice(sliceStart, sliceEnd);

    describe(`${name} [${curr}/${total}]`, function () {
      it("dummy", () => {});
      for (const test of testsSlice) {
        (test.skip ? it.skip : it)(
          test.suiteName + " " + test.testName,
          test.fn as any,
        );
      }
    });
  };
}

export function buildProcessTests(
  dir: string,
  beforeHook: ProcessTestBeforeHook,
  afterHook?: ProcessTestAfterHook,
) {
  const tests: ProcessTest[] = [];

  readdirSync(dir).forEach(function (suiteName) {
    if (suiteName.startsWith(".") || suiteName === "package.json") return;

    const suiteLoc = path.join(dir, suiteName);

    readdirSync(suiteLoc).forEach(function (testName) {
      if (testName.startsWith(".")) return;

      const testLoc = path.join(suiteLoc, testName);

      let opts: ProcessTestOpts = {
        args: [],
      };

      const optionsLoc = path.join(testLoc, "options.json");
      if (existsSync(optionsLoc)) {
        const taskOpts = JSON.parse(readFileSync(optionsLoc, "utf8"));
        if (taskOpts.os) {
          let os = taskOpts.os;

          if (!Array.isArray(os) && typeof os !== "string") {
            throw new Error(
              `'os' should be either string or string array: ${taskOpts.os}`,
            );
          }

          if (typeof os === "string") {
            os = [os];
          }

          if (!os.includes(process.platform)) {
            return;
          }

          delete taskOpts.os;
        }
        opts = { args: [], ...taskOpts };
      }

      const executorLoc = path.join(testLoc, "executor.js");
      if (existsSync(executorLoc)) {
        opts.executor = executorLoc;
      }

      opts.stderrPath = path.join(testLoc, "stderr.txt");
      opts.stdoutPath = path.join(testLoc, "stdout.txt");
      for (const key of ["stdout", "stdin", "stderr"] as const) {
        const loc = path.join(testLoc, key + ".txt");
        if (existsSync(loc)) {
          opts[key] = readFile(loc);
        } else {
          opts[key] = opts[key] || "";
        }
      }

      opts.testLoc = testLoc;
      opts.outFiles = readDir(path.join(testLoc, "out-files"), pathFilter);
      opts.inFiles = readDir(path.join(testLoc, "in-files"), pathFilter);

      const babelrcLoc = path.join(testLoc, ".babelrc");
      const babelIgnoreLoc = path.join(testLoc, ".babelignore");
      if (existsSync(babelrcLoc)) {
        // copy .babelrc file to tmp directory
        opts.inFiles[".babelrc"] = readFile(babelrcLoc);
      } else if (!opts.noBabelrc) {
        opts.inFiles[".babelrc"] = "{}";
      }
      if (existsSync(babelIgnoreLoc)) {
        // copy .babelignore file to tmp directory
        opts.inFiles[".babelignore"] = readFile(babelIgnoreLoc);
      }

      const skip =
        (opts.minNodeVersion &&
          parseInt(process.versions.node, 10) < opts.minNodeVersion) ||
        (process.env.BABEL_9_BREAKING
          ? opts.BABEL_9_BREAKING === false
          : opts.BABEL_9_BREAKING === true);

      const test: ProcessTest = {
        suiteName,
        testName,
        skip,
        opts,
        fn: function (callback: Function) {
          const tmpLoc = path.join(
            tmpDir,
            "babel-process-test",
            createHash("sha1").update(testLoc).digest("hex"),
          );
          deleteDir(tmpLoc);
          mkdirSync(tmpLoc, { recursive: true });

          const { inFiles } = opts;
          for (const filename of Object.keys(inFiles)) {
            outputFileSync(path.join(tmpLoc, filename), inFiles[filename]);
          }

          try {
            beforeHook(test, tmpLoc);

            if (test.binLoc === undefined) {
              throw new Error("test.binLoc is undefined");
            }

            let args = opts.executor
              ? [
                  "--require",
                  path.join(dirname, "./exit-loader.cjs"),
                  test.binLoc,
                ]
              : [test.binLoc];

            args = args.concat(opts.args);
            const env = {
              ...process.env,
              FORCE_COLOR: "false",
              ...(parseInt(process.versions.node) >= 22 && {
                NODE_OPTIONS: "--disable-warning=ExperimentalWarning",
              }),
              ...opts.env,
            };
            const child = spawn(process.execPath, args, {
              env,
              cwd: tmpLoc,
              stdio:
                opts.executor || opts.ipc
                  ? ["pipe", "pipe", "pipe", "ipc"]
                  : "pipe",
            });

            let stderr = "";
            let stdout = "";
            let ipcMessage: unknown;

            child.on("close", function () {
              let err;

              try {
                const result = afterHook
                  ? afterHook(test, tmpLoc, stdout, stderr)
                  : { stdout, stderr };
                assertTest(
                  result.stdout,
                  result.stderr,
                  ipcMessage,
                  opts,
                  tmpLoc,
                );
              } catch (e) {
                err = e;
              } finally {
                try {
                  deleteDir(tmpLoc);
                } catch (error) {
                  console.error(error);
                }
              }

              if (err) {
                err.message =
                  args.map(arg => `"${arg}"`).join(" ") + ": " + err.message;
              }

              callback(err);
            });

            if (opts.ipc) {
              child.on("message", function (message) {
                ipcMessage = message;
              });
            }

            if (opts.stdin) {
              child.stdin.write(opts.stdin);
              child.stdin.end();
            }

            const captureOutput = (proc: ChildProcess) => {
              proc.stderr.on("data", function (chunk) {
                stderr += chunk;
              });

              proc.stdout.on("data", function (chunk) {
                stdout += chunk;
              });
            };

            if (opts.executor) {
              const executor = spawn(process.execPath, [opts.executor], {
                cwd: tmpLoc,
              });

              child.stdout.pipe(executor.stdin);
              child.stderr.pipe(executor.stdin);

              executor.on("close", function () {
                child.send("exit");
              });

              captureOutput(executor);
            } else {
              captureOutput(child);
            }
          } catch (e) {
            deleteDir(tmpLoc);
            throw e;
          }
        },
      };
      tests.push(test);
    });
  });

  tests.sort(function (testA, testB) {
    const nameA = testA.suiteName + "/" + testA.testName;
    const nameB = testB.suiteName + "/" + testB.testName;
    return nameA.localeCompare(nameB);
  });

  return tests;
}
