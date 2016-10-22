let readdir        = require("fs-readdir-recursive");
let helper         = require("babel-helper-fixtures");
let assert         = require("assert");
let rimraf         = require("rimraf");
let outputFileSync = require("output-file-sync");
let child          = require("child_process");
let path           = require("path");
let chai           = require("chai");
let fs             = require("fs");
let _              = require("lodash");

let fixtureLoc = path.join(__dirname, "fixtures");
let tmpLoc = path.join(__dirname, "tmp");

let presetLocs = [
  path.join(__dirname, "../../babel-preset-es2015"),
  path.join(__dirname, "../../babel-preset-react")
].join(",");

let pluginLocs = [
  path.join(__dirname, "/../../babel-plugin-transform-strict-mode"),
  path.join(__dirname, "/../../babel-plugin-transform-es2015-modules-commonjs"),
].join(",");

let readDir = function (loc) {
  let files = {};
  if (fs.existsSync(loc)) {
    _.each(readdir(loc), function (filename) {
      files[filename] = helper.readFile(path.join(loc, filename));
    });
  }
  return files;
};

let saveInFiles = function (files) {
  _.each(files, function (content, filename) {
    outputFileSync(filename, content);
  });
};

let assertTest = function (stdout, stderr, opts) {
  let expectStderr = opts.stderr.trim();
  stderr = stderr.trim();

  if (opts.stderr) {
    if (opts.stderrContains) {
      assert.ok(_.includes(stderr, expectStderr), "stderr " + JSON.stringify(stderr) + " didn't contain " + JSON.stringify(expectStderr));
    } else {
      chai.expect(stderr).to.equal(expectStderr, "stderr didn't match");
    }
  } else if (stderr) {
    throw new Error("stderr:\n" + stderr);
  }

  let expectStdout = opts.stdout.trim();
  stdout = stdout.trim();
  stdout = stdout.replace(/\\/g, "/");

  if (opts.stdout) {
    if (opts.stdoutContains) {
      assert.ok(_.includes(stdout, expectStdout), "stdout " + JSON.stringify(stdout) + " didn't contain " + JSON.stringify(expectStdout));
    } else {
      chai.expect(stdout).to.equal(expectStdout, "stdout didn't match");
    }
  } else if (stdout) {
    throw new Error("stdout:\n" + stdout);
  }

  _.each(opts.outFiles, function (expect, filename) {
    let actual = helper.readFile(filename);
    chai.expect(actual).to.equal(expect, "out-file " + filename);
  });
};

let buildTest = function (binName, testName, opts) {
  let binLoc = path.join(__dirname, "../lib", binName);

  return function (callback) {
    clear();
    saveInFiles(opts.inFiles);

    let args = [binLoc];

    if (binName !== "babel-external-helpers") {
      args.push("--presets", presetLocs, "--plugins", pluginLocs);
    }

    if (binName === "babel-node") {
      args.push("--only", "packages/*/test");
    }

    args = args.concat(opts.args);

    let spawn = child.spawn(process.execPath, args);

    let stderr = "";
    let stdout = "";

    spawn.stderr.on("data", function (chunk) {
      stderr += chunk;
    });

    spawn.stdout.on("data", function (chunk) {
      stdout += chunk;
    });

    spawn.on("close", function () {
      let err;

      try {
        assertTest(stdout, stderr, opts);
      } catch (e) {
        err = e;
      }

      if (err) {
        err.message = args.join(" ") + ": " + err.message;
      }

      callback(err);
    });

    if (opts.stdin) {
      spawn.stdin.write(opts.stdin);
      spawn.stdin.end();
    }
  };
};

let clear = function () {
  process.chdir(__dirname);
  if (fs.existsSync(tmpLoc)) rimraf.sync(tmpLoc);
  fs.mkdirSync(tmpLoc);
  process.chdir(tmpLoc);
};

_.each(fs.readdirSync(fixtureLoc), function (binName) {
  if (binName[0] === ".") return;

  let suiteLoc = path.join(fixtureLoc, binName);
  describe("bin/" + binName, function () {
    _.each(fs.readdirSync(suiteLoc), function (testName) {
      if (testName[0] === ".") return;

      let testLoc = path.join(suiteLoc, testName);

      let opts = {
        args: []
      };

      let optionsLoc = path.join(testLoc, "options.json");
      if (fs.existsSync(optionsLoc)) _.merge(opts, require(optionsLoc));

      _.each(["stdout", "stdin", "stderr"], function (key) {
        let loc = path.join(testLoc, key + ".txt");
        if (fs.existsSync(loc)) {
          opts[key] = helper.readFile(loc);
        } else {
          opts[key] = opts[key] || "";
        }
      });

      opts.outFiles = readDir(path.join(testLoc, "out-files"));
      opts.inFiles  = readDir(path.join(testLoc, "in-files"));

      let babelrcLoc = path.join(testLoc, ".babelrc");
      if (fs.existsSync(babelrcLoc)) {
        // copy .babelrc file to tmp directory
        opts.inFiles[".babelrc"] = helper.readFile(babelrcLoc);
      }

      it(testName, buildTest(binName, testName, opts));
    });
  });
});
