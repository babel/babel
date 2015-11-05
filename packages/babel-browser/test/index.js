var vm = require("vm");
var fs = require("fs");

var loc = __dirname + "/../dist/browser.js";

suite("browser", function () {
  test("sanity check", function () {
    if (fs.existsSync(loc)) {
      require(loc);
    }
  });
});
