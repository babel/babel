/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var fs = require("fs");
var path = require("path");
var semver = require("semver");
var spawn = require("child_process").spawn;
var regenerator = require("../main");

function convert(es6File, es5File, callback) {
  fs.readFile(es6File, "utf-8", function(err, es6) {
    if (err) {
      return callback(err);
    }

    fs.writeFile(es5File, regenerator(es6), callback);
  });
}

function bundle(es5File, browserFile, callback) {
  var browserify = require("browserify");
  var b = browserify();
  b.add(es5File);
  b.bundle(function(err, src) {
    if (err) {
      return callback(err);
    }
    fs.writeFile(browserFile, src, callback);
  });
}

var queue = [];
function enqueue(cmd, args) {
  queue.push({
    cmd: cmd,
    args: args || []
  });
}

function flush() {
  var entry = queue.shift();
  if (entry) {
    var cmd = entry.cmd;
    if (typeof cmd === "function") {
      cmd.apply(null, entry.args.concat(asyncCallback));
    } else {
      spawn(cmd, entry.args, {
        stdio: "inherit"
      }).on("exit", asyncCallback);
    }
  }
}

function asyncCallback(err) {
  if (err) {
    console.error("process exited abnormally:", err);
    process.exit(typeof err === "number" ? err : -1);
  } else {
    process.nextTick(flush);
  }
}

enqueue(convert, [
  "./test/tests.es6.js",
  "./test/tests.es5.js"
]);

if (semver.gte(process.version, "0.11.0")) {
  enqueue("mocha", [
    "--harmony-generators",
    "--reporter", "spec",
    "./test/tests.es6.js"
  ]);
}

enqueue("mocha", [
  "--reporter", "spec",
  "./test/tests.es5.js"
]);

var mochaDir = path.dirname(require.resolve("mocha"));
function makeMochaCopyFunction(fileName) {
  return function copy(callback) {
    var src = path.join(mochaDir, fileName);
    var dst = path.join(__dirname, fileName);
    fs.unlink(dst, function() {
      fs.symlink(src, dst, callback);
    });
  };
}

enqueue(makeMochaCopyFunction("mocha.js"));
enqueue(makeMochaCopyFunction("mocha.css"));

// uglify-js does not work properly due to Node 0.11.7 bug.
// (https://github.com/joyent/node/issues/6235)
if (!semver.eq(process.version, "0.11.7")) {
  try {
    require.resolve("browserify"); // Throws if missing.
    enqueue(bundle, [
      "./test/tests.es5.js",
      "./test/tests.browser.js"
    ]);
  } catch (ignored) {
    console.error("browserify not installed; skipping bundle step");
  }
}

flush();
