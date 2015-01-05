if (!process.env.ALL_6TO5_TESTS) return;

require("../register")({
  blacklist: ["useStrict"],
  experimental: true
});

var transform = require("../lib/6to5/transformation/transform");
var fs        = require("fs");
var _         = require("lodash");

var regeneratorLoc = __dirname + "/../vendor/regenerator";

if (!fs.existsSync(regeneratorLoc)) {
  console.error("No vendor/regenerator - run `git submodule update --init && cd vendor/regenerator && npm install`");
  process.exit(1);
}

_.each(["tests", "async"], function (filename) {
  var loc = regeneratorLoc + "/test/" + filename + ".es6.js";
  var code = fs.readFileSync(loc, "utf8");
  require(loc);
});
