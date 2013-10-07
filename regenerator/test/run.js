var fs = require("fs");
var path = require("path");
var semver = require("semver");
var spawn = require("child_process").spawn;
var regenerate = require("../main");

function convert(es6File, es5File, callback) {
  fs.readFile(es6File, "utf-8", function(err, es6) {
    if (err) {
      return callback(err);
    }

    fs.writeFile(es5File, regenerate(es6), callback);
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
    args: args
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
  "test/tests.es6.js",
  "test/tests.es5.js"
]);

if (semver.gte(process.version, "0.11.0")) {
  enqueue("mocha", [
    "--harmony-generators",
    "--reporter", "spec",
    "test/tests.es6.js"
  ]);
}

enqueue("mocha", [
  "--reporter", "spec",
  "test/tests.es5.js"
]);

enqueue(bundle, [
  "./test/tests.es5.js",
  "test/tests.browser.js"
]);

flush();
