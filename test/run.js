var driver = require("./driver.js");
require("./tests.js");
require("./tests-harmony.js");

var testsRun = 0, failed = 0;
function report(state, code, message) {
  if (state != "ok") {++failed; console.log(code, message);}
  ++testsRun;
}

var t0 = +new Date;

var parse = (typeof require === "undefined" ? window.acorn : require("../acorn.js")).parse;
var parse_dammit = (typeof require === "undefined") ? window.acorn_loose : require("../acorn_loose").parse_dammit;

driver.runTests({parse: parse, callback: report});
driver.runTests({parse: parse_dammit, loose: true, callback: report});
console.log(testsRun + " tests run in " + (+new Date - t0) + "ms");

if (failed) {
  console.log(failed + " failures.");
  process.stdout.write("", function() {
    process.exit(1);
  });
} else {
  console.log("All passed.");
}
