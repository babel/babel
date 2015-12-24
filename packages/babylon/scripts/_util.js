var fs = require("fs");

exports.updateMain = function (main) {
  var pkg = require("../package.json");
  pkg.main = main;
  fs.writeFileSync(__dirname + "/../package.json", JSON.stringify(pkg, null, "  "));
};
