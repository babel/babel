if (!process.env.ALL_BABEL_TESTS) return;

require("./_helper").assertVendor("regenerator");

var transform = require("../lib/babel/transformation");
var fs        = require("fs");
var _         = require("lodash");

var regeneratorLoc = __dirname + "/../vendor/regenerator";

suite("regenerator", function () {
  setup(function () {
    require("../register")({
      blacklist: ["strict"],
      experimental: true
    });
  });

  _.each(["tests", "async"], function (filename) {
    var loc = regeneratorLoc + "/test/" + filename + ".es6.js";
    var code = fs.readFileSync(loc, "utf8");
    require(loc);
  });
});
