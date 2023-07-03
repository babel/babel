import readdir from "fs-readdir-recursive";
import * as helper from "@babel/helper-fixtures";
import rimraf from "rimraf";
import semver from "@nicolo-ribaudo/semver-v6";
import child from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createRequire } from "module";

import { chmod } from "../lib/babel/util.js";

const require = createRequire(import.meta.url);

const dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtureLoc = path.join(dirname, "fixtures");
const tmpLoc = path.join(dirname, "tmp");
const rootDir = path.resolve(dirname, "../../..");

const fileFilter = function (x) {
  return x !== ".DS_Store";
};

const outputFileSync = function (filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, data);
};

const getPath = name => path.join(rootDir, "packages", name, "lib", "index.js");

const presetLocs = [getPath("babel-preset-react")];

const pluginLocs = [
  getPath("babel-plugin-transform-arrow-functions"),
  getPath("babel-plugin-transform-strict-mode"),
  getPath("babel-plugin-transform-modules-commonjs"),
].join(",");

const readDir = function (loc, filter) {
  const files = {};
  if (fs.existsSync(loc)) {
    readdir(loc, filter).forEach(function (filename) {
      files[filename] = helper.readFile(path.join(loc, filename));
    });
  }
  return files;
};

const saveInFiles = function (files) {
  Object.keys(files).forEach(function (filename) {
    const content = files[filename];
    outputFileSync(path.join(tmpLoc, filename), content);
  });
};

function escapeRegExp(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

const normalizeOutput = function (str, cwd) {
  let result = str
    .replace(/\(\d+ms\)/g, "(123ms)")
    .replace(new RegExp(escapeRegExp(cwd), "g"), "<CWD>")
    // (non-win32) /foo/babel/packages -> <CWD>/packages
    // (win32) C:\foo\babel\packages -> <CWD>\packages
    .replace(new RegExp(escapeRegExp(rootDir), "g"), "<ROOTDIR>");
  if (process.platform === "win32") {
    result = result
      // C:\\foo\\babel\\packages -> <CWD>\\packages (in js string literal)
      .replace(
        new RegExp(escapeRegExp(rootDir.replace(/\\/g, "\\\\")), "g"),
        "<ROOTDIR>",
      );
  }
  return result;
};

const assertTest = function (stdout, stderr, opts, cwd) {
  stdout = normalizeOutput(stdout, cwd);
  stderr = normalizeOutput(stderr, cwd);

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

  if (opts.outFiles) {
    const actualFiles = readDir(tmpLoc, fileFilter);

    Object.keys(actualFiles).forEach(function (filename) {
      try {
        if (
          // saveInFiles always creates an empty .babelrc, so lets exclude for now
          filename !== ".babelrc" &&
          filename !== ".babelignore" &&
          !Object.prototype.hasOwnProperty.call(opts.inFiles, filename)
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

const nodeGte8 = semver.gte(process.version, "8.0.0");

const buildTest = function (binName, testName, opts) {
  const binLoc = path.join(dirname, "../lib", binName);

  return function (callback) {
    saveInFiles(opts.inFiles);

    let args = nodeGte8
      ? ["--require", path.join(dirname, "./exit-loader.cjs"), binLoc]
      : [binLoc];

    if (binName !== "babel-external-helpers" && !opts.noDefaultPlugins) {
      args.push("--presets", presetLocs, "--plugins", pluginLocs);
    }

    args = args.concat(opts.args);
    const env = { ...process.env, ...opts.env };

    const spawn = child.spawn(process.execPath, args, {
      env,
      cwd: tmpLoc,
      stdio: [null, null, null, "ipc"],
    });

    let stderr = "";
    let stdout = "";

    spawn.on("close", function () {
      let err;

      try {
        assertTest(stdout, stderr, opts, tmpLoc);
      } catch (e) {
        err = e;
      }

      if (err) {
        err.message =
          args.map(arg => `"${arg}"`).join(" ") + ": " + err.message;
      }

      callback(err);
    });

    if (opts.stdin) {
      spawn.stdin.write(opts.stdin);
      spawn.stdin.end();
    }

    const captureOutput = proc => {
      proc.stderr.on("data", function (chunk) {
        stderr += chunk;
      });

      proc.stdout.on("data", function (chunk) {
        stdout += chunk;
      });
    };

    if (opts.executor) {
      const executor = child.spawn(process.execPath, [opts.executor], {
        cwd: tmpLoc,
      });

      spawn.stdout.pipe(executor.stdin);
      spawn.stderr.pipe(executor.stdin);

      executor.on("close", function () {
        if (nodeGte8) {
          spawn.send("exit");
        } else {
          spawn.kill("SIGKILL");
        }
      });

      captureOutput(executor);
    } else {
      captureOutput(spawn);
    }
  };
};

fs.readdirSync(fixtureLoc).forEach(function (binName) {
  if (binName.startsWith(".") || binName === "package.json") return;

  const suiteLoc = path.join(fixtureLoc, binName);
  describe("bin/" + binName, function () {
    beforeEach(() => {
      if (fs.existsSync(tmpLoc)) {
        for (const child of fs.readdirSync(tmpLoc)) {
          rimraf.sync(path.join(tmpLoc, child));
        }
      } else {
        fs.mkdirSync(tmpLoc);
      }
    });

    fs.readdirSync(suiteLoc).forEach(function (testName) {
      if (testName.startsWith(".")) return;

      const testLoc = path.join(suiteLoc, testName);

      let opts = {
        args: [],
      };

      const optionsLoc = path.join(testLoc, "options.json");
      if (fs.existsSync(optionsLoc)) {
        const taskOpts = require(optionsLoc);
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
      if (fs.existsSync(executorLoc)) {
        opts.executor = executorLoc;
      }

      ["stdout", "stdin", "stderr"].forEach(function (key) {
        const loc = path.join(testLoc, key + ".txt");
        opts[key + "Path"] = loc;
        if (fs.existsSync(loc)) {
          opts[key] = helper.readFile(loc);
        } else {
          opts[key] = opts[key] || "";
        }
      });

      opts.testLoc = testLoc;
      opts.outFiles = readDir(path.join(testLoc, "out-files"), fileFilter);
      opts.inFiles = readDir(path.join(testLoc, "in-files"), fileFilter);

      const babelrcLoc = path.join(testLoc, ".babelrc");
      const babelIgnoreLoc = path.join(testLoc, ".babelignore");
      if (fs.existsSync(babelrcLoc)) {
        // copy .babelrc file to tmp directory
        opts.inFiles[".babelrc"] = helper.readFile(babelrcLoc);
      } else if (!opts.noBabelrc) {
        opts.inFiles[".babelrc"] = "{}";
      }
      if (fs.existsSync(babelIgnoreLoc)) {
        // copy .babelignore file to tmp directory
        opts.inFiles[".babelignore"] = helper.readFile(babelIgnoreLoc);
      }

      const skip =
        opts.minNodeVersion &&
        parseInt(process.versions.node, 10) < opts.minNodeVersion;

      // eslint-disable-next-line jest/valid-title
      (skip ? it.skip : it)(
        testName,
        buildTest(binName, testName, opts),
        20000,
      );
    });
  });
});

describe("util.js", () => {
  describe("chmod", () => {
    it("should warn the user if chmod fails", () => {
      const spyConsoleWarn = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      // The first argument should be a string.
      // The real reason chmod will fail is due to wrong permissions,
      // but this is enough to cause a failure.
      chmod(100, "file.js");

      expect(spyConsoleWarn).toHaveBeenCalledTimes(1);
      expect(spyConsoleWarn).toHaveBeenCalledWith(
        "Cannot change permissions of file.js",
      );

      spyConsoleWarn.mockRestore();
    });
  });
});
