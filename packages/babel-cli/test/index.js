var readdir        = require("fs-readdir-recursive");
var helper         = require("babel-helper-fixtures");
var assert         = require("assert");
var rimraf         = require("rimraf");
var outputFileSync = require("output-file-sync");
var child          = require("child_process");
var path           = require("path");
var chai           = require("chai");
var fs             = require("fs");
var pathExists     = require("path-exists");
var _              = require("lodash");

var fixtureLoc = path.join(__dirname, "fixtures");
var tmpLoc = path.join(__dirname, "tmp");

var presetLocs = [
  path.join(__dirname, "../../babel-preset-es2015"),
  path.join(__dirname, "../../babel-preset-react")
].join(",");

var pluginLocs = [
  path.join(__dirname, "/../../babel-plugin-transform-strict-mode"),
  path.join(__dirname, "/../../babel-plugin-transform-es2015-modules-commonjs"),
].join(",");

var readDir = function (loc) {
  var files = {};
  if (pathExists.sync(loc)) {
    _.each(readdir(loc), function (filename) {
      files[filename] = helper.readFile(path.join(loc, filename));
    });
  }
  return files;
};

var saveInFiles = function (files) {
  _.each(files, function (content, filename) {
    outputFileSync(filename, content);
  });
};

var assertTest = function (stdout, stderr, opts) {
  var expectStderr = opts.stderr.trim();
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

  var expectStdout = opts.stdout.trim();
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
    var actual = helper.readFile(filename);
    chai.expect(actual).to.equal(expect, "out-file " + filename);
  });
};

var buildTest = function (binName, testName, opts) {
  var binLoc = path.join(__dirname, "../lib", binName);

  return function (callback) {
    clear();
    saveInFiles(opts.inFiles);

    var args = [binLoc];

    if (binName !== "babel-external-helpers") {
      args.push("--presets", presetLocs, "--plugins", pluginLocs);
    }

    if (binName === "babel-node") {
      args.push("--only", "packages/*/test");
    }

    args = args.concat(opts.args);

    var spawn = child.spawn(process.execPath, args);

    var stderr = "";
    var stdout = "";

    spawn.stderr.on("data", function (chunk) {
      stderr += chunk;
    });

    spawn.stdout.on("data", function (chunk) {
      stdout += chunk;
    });

    spawn.on("close", function () {
      var err;

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

var clear = function () {
  process.chdir(__dirname);
  if (pathExists.sync(tmpLoc)) rimraf.sync(tmpLoc);
  fs.mkdirSync(tmpLoc);
  process.chdir(tmpLoc);
};

_.each(fs.readdirSync(fixtureLoc), function (binName) {
  if (binName[0] === ".") return;

  var suiteLoc = path.join(fixtureLoc, binName);
  suite("bin/" + binName, function () {
    _.each(fs.readdirSync(suiteLoc), function (testName) {
      if (testName[0] === ".") return;

      var testLoc = path.join(suiteLoc, testName);

      var opts = {
        args: []
      };

      var optionsLoc = path.join(testLoc, "options.json");
      if (pathExists.sync(optionsLoc)) _.merge(opts, require(optionsLoc));

      _.each(["stdout", "stdin", "stderr"], function (key) {
        var loc = path.join(testLoc, key + ".txt");
        if (pathExists.sync(loc)) {
          opts[key] = helper.readFile(loc);
        } else {
          opts[key] = opts[key] || "";
        }
      });

      opts.outFiles = readDir(path.join(testLoc, "out-files"));
      opts.inFiles  = readDir(path.join(testLoc, "in-files"));

      var babelrcLoc = path.join(testLoc, ".babelrc");
      if (pathExists.sync(babelrcLoc)) {
        // copy .babelrc file to tmp directory
        opts.inFiles['.babelrc'] = helper.readFile(babelrcLoc);
      }

      test(testName, buildTest(binName, testName, opts));
    });
  });
});
