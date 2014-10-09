(function (obj) {
  for (var i in obj) {
    exports[i] = obj[i];
  }
}(require("foo")));

exports.foo = require("foo").foo;

exports.foo = require("foo").foo;
exports.bar = require("foo").bar;

exports.bar = require("foo").foo;

module.exports = exports = require("foo").foo;

module.exports = exports = require("foo").foo;
exports.bar = require("foo").bar;

module.exports = exports = require("foo");

exports.foo = require("foo");

