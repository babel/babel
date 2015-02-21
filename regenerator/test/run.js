/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var fs = require("fs");
var path = require("path");
var semver = require("semver");
var spawn = require("child_process").spawn;
var regenerator = require("../main");
var mochaDir = path.dirname(require.resolve("mocha"));

function convert(es6File, es5File, callback) {
  fs.readFile(es6File, "utf-8", function(err, es6) {
    if (err) {
      return callback(err);
    }

    fs.writeFile(es5File, regenerator.compile(es6).code, callback);
  });
}

function bundle(es5Files, browserFile, callback) {
  var bundle = require("browserify")();
  es5Files.forEach(bundle.add, bundle);
  bundle.bundle(function(err, src) {
    if (err) {
      return callback(err);
    }
    fs.writeFile(browserFile, src, callback);
  });
}

var queue = [];
function enqueue(cmd, args, quiet) {
  queue.push({
    cmd: cmd,
    args: args || [],
    quiet: !!quiet
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
        stdio: [
          process.stdin,
          entry.quiet ? "ignore" : process.stdout,
          process.stderr
        ]
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

function makeMochaCopyFunction(fileName) {
  return function copy(callback) {
    var src = path.join(mochaDir, fileName);
    var dst = path.join(__dirname, fileName);
    fs.unlink(dst, function() {
      fs.symlink(src, dst, callback);
    });
  };
}

if (semver.gte(process.version, "0.11.2")) {
  enqueue("mocha", [
    "--harmony",
    "--reporter", "spec",
    "--require", "./runtime",
    "./test/tests.es6.js"
  ]);
}

enqueue(convert, [
  "./test/tests.es6.js",
  "./test/tests.es5.js"
]);

enqueue(convert, [
  "./test/async.es6.js",
  "./test/async.es5.js"
]);

enqueue(makeMochaCopyFunction("mocha.js"));
enqueue(makeMochaCopyFunction("mocha.css"));

// uglify-js does not work properly due to Node 0.11.7 bug.
// (https://github.com/joyent/node/issues/6235)
if (!semver.eq(process.version, "0.11.7")) {
  try {
    require.resolve("browserify"); // Throws if missing.
    enqueue(bundle, [
      ["./runtime.js",
       "./test/tests.es5.js",
       "./test/async.es5.js"],
      "./test/tests.browser.js"
    ]);
  } catch (ignored) {
    console.error("browserify not installed; skipping bundle step");
  }
}

enqueue("mocha", [
  "--reporter", "spec",
  "--require", "./runtime",
  "./test/tests.es5.js",
  "./test/async.es5.js"
]);

// Run command-line tool with available options to make sure it works.

enqueue("./bin/regenerator", [
  "./test/async.es5.js"
], true);

enqueue("./bin/regenerator", [
  "--include-runtime",
  "./test/async.es5.js"
], true);

enqueue("./bin/regenerator", [
  "--disable-async",
  "./test/async.es5.js"
], true);

enqueue("./bin/regenerator", [
  "--include-runtime",
  "--disable-async",
  "./test/async.es5.js"
], true);

// Make sure we run the command-line tool on a file that does not need any
// transformation, too.

enqueue("./bin/regenerator", [
  "./test/nothing-to-transform.js"
], true);

enqueue("./bin/regenerator", [
  "--include-runtime",
  "./test/nothing-to-transform.js"
], true);

enqueue("./bin/regenerator", [
  "--disable-async",
  "./test/nothing-to-transform.js"
], true);

enqueue("./bin/regenerator", [
  "--include-runtime",
  "--disable-async",
  "./test/nothing-to-transform.js"
], true);

flush();
