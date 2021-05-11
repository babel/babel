import readdir from "fs-readdir-recursive";
import * as helper from "@babel/helper-fixtures";
import rimraf from "rimraf";
import { sync as makeDirSync } from "make-dir";
import child from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtureLoc = path.join(dirname, "fixtures", "cli");
const tmpLoc = path.join(dirname, "tmp");
const binLoc = path.join(dirname, "../lib/babel-node");

const fileFilter = function (x) {
  return x !== ".DS_Store";
};

const outputFileSync = function (filePath, data) {
  makeDirSync(path.dirname(filePath));
  fs.writeFileSync(filePath, data);
};

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
  // Place an empty .babelrc in each test so tests won't unexpectedly get to repo-level config.
  outputFileSync(".babelrc", "{}");

  Object.keys(files).forEach(function (filename) {
    const content = files[filename];
    outputFileSync(filename, content);
  });
};

const assertTest = function (stdout, stderr, ipcMessage, opts) {
  const expectStderr = opts.stderr.trim();
  stderr = stderr.trim();

  if (opts.stderr) {
    if (opts.stderrContains) {
      expect(stderr.includes(expectStderr)).toBeTruthy();
    } else {
      expect(stderr).toBe(expectStderr);
    }
  } else if (stderr) {
    throw new Error("stderr:\n" + stderr + "\n\nstdout:\n" + stdout);
  }

  const expectStdout = opts.stdout.trim();
  stdout = stdout.trim();
  stdout = stdout.replace(/\\/g, "/");

  if (opts.stdout) {
    if (opts.stdoutContains) {
      expect(stdout.includes(expectStdout)).toBeTruthy();
    } else {
      expect(stdout).toBe(expectStdout);
    }
  } else if (stdout) {
    throw new Error("stdout:\n" + stdout);
  }

  if (opts.ipc) {
    expect(ipcMessage).toEqual(opts.ipcMessage);
  }

  if (opts.outFiles) {
    const actualFiles = readDir(path.join(tmpLoc));

    Object.keys(actualFiles).forEach(function (filename) {
      if (!Object.prototype.hasOwnProperty.call(opts.inFiles, filename)) {
        const expected = opts.outFiles[filename];
        const actual = actualFiles[filename];

        expect(expected).not.toBeUndefined();

        if (expected) {
          expect(actual).toBe(expected);
        }
      }
    });

    Object.keys(opts.outFiles).forEach(function (filename) {
      expect(actualFiles).toHaveProperty(filename);
    });
  }
};

const buildTest = function (testName, opts) {
  return function (callback) {
    saveInFiles(opts.inFiles);
    let args = [binLoc];
    args.push("--config-file", "../config.json");
    args = args.concat(opts.args);

    const spawnOpts = {};
    if (opts.ipc) {
      spawnOpts.stdio = ["pipe", "pipe", "pipe", "ipc"];
    }

    const spawn = child.spawn(process.execPath, args, spawnOpts);

    let stderr = "";
    let stdout = "";
    let ipcMessage;

    spawn.stderr.on("data", function (chunk) {
      stderr += chunk;
    });

    spawn.stdout.on("data", function (chunk) {
      stdout += chunk;
    });

    if (opts.ipc) {
      spawn.on("message", function (message) {
        ipcMessage = message;
      });
    }

    spawn.on("close", function () {
      let err;

      try {
        assertTest(stdout, stderr, ipcMessage, opts);
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
  };
};

describe("bin/babel-node", function () {
  let cwd;

  beforeEach(() => {
    cwd = process.cwd();

    if (fs.existsSync(tmpLoc)) {
      for (const child of fs.readdirSync(tmpLoc)) {
        rimraf.sync(path.join(tmpLoc, child));
      }
    } else {
      fs.mkdirSync(tmpLoc);
    }

    process.chdir(tmpLoc);
  });

  afterEach(() => {
    process.chdir(cwd);
  });

  fs.readdirSync(fixtureLoc).forEach(function (testName) {
    if (testName[0] === ".") return;

    const testLoc = path.join(fixtureLoc, testName);

    const opts = {
      args: [],
    };

    const optionsLoc = path.join(testLoc, "options.json");
    if (fs.existsSync(optionsLoc)) Object.assign(opts, require(optionsLoc));

    ["stdout", "stdin", "stderr"].forEach(function (key) {
      const loc = path.join(testLoc, key + ".txt");
      if (fs.existsSync(loc)) {
        opts[key] = helper.readFile(loc);
      } else {
        opts[key] = opts[key] || "";
      }
    });

    opts.outFiles = readDir(path.join(testLoc, "out-files"), fileFilter);
    opts.inFiles = readDir(path.join(testLoc, "in-files"), fileFilter);

    const babelrcLoc = path.join(testLoc, ".babelrc");
    if (fs.existsSync(babelrcLoc)) {
      // copy .babelrc file to tmp directory
      opts.inFiles[".babelrc"] = helper.readFile(babelrcLoc);
    }

    it(testName, buildTest(testName, opts), 20000);
  });
});
