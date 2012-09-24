var driver = require("./driver.js");
require("./tests.js");

var testsRun = 0, failed = 0;
function report(state, code, message) {
  if (state != "ok") {++failed; console.log(code, message);}
  ++testsRun;
}

var t0 = +new Date;
driver.runTests(report);
console.log(testsRun + " tests run in " + (+new Date - t0) + "ms");
if (failed) console.log(failed + " failures.");
else console.log("All passed.");
