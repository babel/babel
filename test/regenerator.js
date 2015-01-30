if (!process.env.ALL_6TO5_TESTS) return;

require("./_helper").assertVendor("regenerator");

var transform = require("../lib/6to5/transformation/transform");
var fs        = require("fs");
var _         = require("lodash");

var regeneratorLoc = __dirname + "/../vendor/regenerator";

suite("regenerator", function () {
  setup(function () {
    require("../register")({
      blacklist: ["useStrict"],
      experimental: true
    });
  });

  _.each(["tests", "async"], function (filename) {
    var loc = regeneratorLoc + "/test/" + filename + ".es6.js";
    var code = fs.readFileSync(loc, "utf8");
    require(loc);
  });
});
