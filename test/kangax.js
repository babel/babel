require("./_helper").assertVendor("compat-table");

require("../polyfill");

var transform = require("../lib/babel/transformation");
var assert    = require("assert");
var data      = require("../vendor/compat-table/data-es6");
var _         = require("lodash");


global.__createIterableObject = function (a, b, c) {
  var arr = [a, b, c, ,];
  var iterable = {
    next: function() {
      return { value: arr.shift(), done: arr.length <= 0 };
    },
  };
  iterable[Symbol.iterator] = function(){ return iterable; }
  return iterable;
};

var tests = {};

_.each(data.tests, function (test, key) {
  if (test.subtests) {
    _.extend(tests, test.subtests);
  } else {
    tests[test.name] = test;
  }
});

suite("kangax/compat-table", function () {
  for (var key in tests) {
    var data = tests[key];

    if (data.res._babel !== true) continue;

    var exec = data.exec;
    var code = exec.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    // eval test
    if (_.contains(code, "eval") || _.contains(code, "Function")) continue;

    // async test
    if (_.contains(code, "function check() {")) continue;

    test(key, function () {
      code = transform(code, {
        filename: key,
        blacklist: ["useStrict"],
        optional: ["spec.typeofSymbol", "es6.blockScopingTDZ"]
      }).code;

      code = '"use strict";\n' + code;

      var fn;
      try {
        fn = new Function(code);
      } catch (err) {
        return;
      }

      try {
        var fn = new Function(code);
        assert.ok(fn.call(undefined));
      } catch (err) {
        if (err.message === "Cannot redefine property: name") {
          return;
        } else {
          throw err;
        }
      }
    });
  }
});
