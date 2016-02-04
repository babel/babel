'use strict';

var binVersionCheck = require("bin-version-check");
var child = require("child_process");

// run in npm 3+ only
binVersionCheck("npm", ">=3.3.0", function (err) {
  if (!err) {
    console.log("Running ./node_modules/.bin/flow check");
    var cmd = child.spawn("./node_modules/.bin/flow", ["check"], { stdio: "inherit" });
    cmd.on("exit", function(code) {
      console.log(code);
    });
  }
});
