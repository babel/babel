const includes = require("lodash/includes");
const readdir = require("fs-readdir-recursive");
const helper = require("@babel/helper-fixtures");
const rimraf = require("rimraf");
const outputFileSync = require("output-file-sync");
const child = require("child_process");
const merge = require("lodash/merge");
const path = require("path");
const fs = require("fs");

const fixtureLoc = path.join(__dirname, "fixtures");
const tmpLoc = path.join(__dirname, "tmp");

const fileFilter = function(x) {
  return x !== ".DS_Store";
};

const presetLocs = [
  path.join(__dirname, "../../babel-preset-env"),
  path.join(__dirname, "../../babel-preset-react"),
].join(",");

const pluginLocs = [
  path.join(__dirname, "/../../babel-plugin-transform-strict-mode"),
  path.join(__dirname, "/../../babel-plugin-transform-modules-commonjs"),
].join(",");

const readDir = function(loc, filter) {
  const files = {};
  if (fs.existsSync(loc)) {
    readdir(loc, filter).forEach(function(filename) {
      files[filename] = helper.readFile(path.join(loc, filename));
    });
  }
  return files;
};

const saveInFiles = function(files) {
  // Place an empty .babelrc in each test so tests won't unexpectedly get to repo-level config.
  outputFileSync(".babelrc", "{}");

  Object.keys(files).forEach(function(filename) {
    const content = files[filename];
    outputFileSync(filename, content);
  });
};

const assertTest = function(stdout, stderr, opts) {
  const expectStderr = opts.stderr.trim();
  stderr = stderr.trim();

  if (opts.stderr) {
    if (opts.stderrContains) {
      expect(includes(stderr, expectStderr)).toBeTruthy();
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
      expect(includes(stdout, expectStdout)).toBeTruthy();
    } else {
      expect(stdout).toBe(expectStdout);
    }
  } else if (stdout) {
    throw new Error("stdout:\n" + stdout);
  }

  if (opts.outFiles) {
    const actualFiles = readDir(path.join(tmpLoc));

    Object.keys(actualFiles).forEach(function(filename) {
      if (!opts.inFiles.hasOwnProperty(filename)) {
        const expected = opts.outFiles[filename];
        const actual = actualFiles[filename];

        expect(expected).not.toBeUndefined();

        if (expected) {
          expect(actual).toBe(expected);
        }
      }
    });

    Object.keys(opts.outFiles).forEach(function(filename) {
      expect(actualFiles).toHaveProperty(filename);
    });
  }
};

const buildTest = function(binName, testName, opts) {
  const binLoc = path.join(__dirname, "../lib", binName);

  return function(callback) {
    clear();
    saveInFiles(opts.inFiles);

    let args = [binLoc];

    args.push("--presets", presetLocs, "--plugins", pluginLocs);
    args.push("--only", "../../../../packages/*/test");

    args = args.concat(opts.args);

    const spawn = child.spawn(process.execPath, args);

    let stderr = "";
    let stdout = "";

    spawn.stderr.on("data", function(chunk) {
      stderr += chunk;
    });

    spawn.stdout.on("data", function(chunk) {
      stdout += chunk;
    });

    spawn.on("close", function() {
      let err;

      try {
        assertTest(stdout, stderr, opts);
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

const clear = function() {
  process.chdir(__dirname);
  if (fs.existsSync(tmpLoc)) rimraf.sync(tmpLoc);
  fs.mkdirSync(tmpLoc);
  process.chdir(tmpLoc);
};

fs.readdirSync(fixtureLoc).forEach(function(binName) {
  if (binName[0] === ".") return;

  const suiteLoc = path.join(fixtureLoc, binName);
  describe("bin/" + binName, function() {
    let cwd;

    beforeEach(() => {
      cwd = process.cwd();
    });

    afterEach(() => {
      process.chdir(cwd);
    });

    fs.readdirSync(suiteLoc).forEach(function(testName) {
      if (testName[0] === ".") return;

      const testLoc = path.join(suiteLoc, testName);

      const opts = {
        args: [],
      };

      const optionsLoc = path.join(testLoc, "options.json");
      if (fs.existsSync(optionsLoc)) merge(opts, require(optionsLoc));

      ["stdout", "stdin", "stderr"].forEach(function(key) {
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

      it(testName, buildTest(binName, testName, opts));
    });
  });
});
