var assert = require("assert");
var child  = require("child_process");
var path   = require("path");
var fs     = require("fs");
var _      = require("lodash");

var fixtureLoc = __dirname + "/bin-fixtures";
var tmpLoc = __dirname + "/tmp";

var build = function (binName, testName, opts) {
  var testFixtureLoc = fixtureLoc + "/" + binName + "/" + testName;
  if (fs.existsSync(testFixtureLoc)) {
    _.each(fs.readdirSync(testFixtureLoc), function (filename) {
      var key = path.basename(filename, path.extname(filename));
      var file = fs.readFileSync(testFixtureLoc + "/" + filename, "utf8").trim();
      opts[key] = file;
    });
  }

  return function (callback) {
    var args  = [__dirname + "/../bin/" + binName].concat(opts.args);
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
        if (opts.stderr) {
          assert.equal(stderr.trim(), opts.stderr);
        } else if (stderr) {
          throw new Error("stderr: " + stderr);
        }

        if (opts.stdout) {
          assert.equal(stdout.trim(), opts.stdout);
        } else if (stdout) {
          throw new Error("stdout: " + stdout);
        }

        _.each(opts.files, function (expect, filename) {
          var actual = fs.readFileSync(filename, "utf8");
          assert.equal(actual, expect);
        });
      } catch (e) {
        err = e;
      }
      callback(err);
    });

    if (opts.stdin) {
      spawn.stdin.write(opts.stdin);
      spawn.stdin.end();
    }
  };
};

before(function () {
  if (!fs.existsSync(tmpLoc)) fs.mkdirSync(tmpLoc);
  process.chdir(tmpLoc);
});

suite("bin/6to5", function () {
  test("--source-maps-inline");

  test("--source-maps");

  test("--whitelist", build("6to5", "whitelist", {
    args: ["--whitelist", "arrowFunctions"]
  }));

  test("--blacklist", build("6to5", "blacklist", {
    args: ["--blacklist", "arrowFunctions"]
  }));

  test("--out-file", build("6to5", "out-file", {
    args: ["--out-file", "script.js"],
    files: {
      "script.js": "(function() {\n  var MULTIPLER = 5;\n  arr.map(function(x) {\n    return x * MULTIPLIER;\n  });\n})();"
    }
  }));

  test("--out-dir");
});

suite("bin/6to5-node", function () {
  test("--eval", build("6to5-node", "eval", {
    args: ["--eval", "console.log([1, 2, 3].map(x => x * x));"],
    stdout: "[ 1, 4, 9 ]"
  }));

  test("--print", build("6to5-node", "print", {
    args: ["--print", "--eval", "([1, 2, 3].map(x => x * x))"],
    stdout: "[ 1, 4, 9 ]"
  }));
});
