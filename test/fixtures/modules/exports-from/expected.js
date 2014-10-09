(function (obj) {
  for (var i in obj) {
    exports[i] = obj[i];
  }
}(require("foo")));

exports.foo = require("foo").foo;

exports.foo = require("foo").foo;
exports.bar = require("foo").bar;

exports.bar = require("foo").foo;

exports.default = require("foo").foo;

exports.default = require("foo").foo;
exports.bar = require("foo").bar;

exports.default = require("foo").default;

exports.foo = require("foo").default;

