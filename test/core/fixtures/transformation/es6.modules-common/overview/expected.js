"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var hop = Object.prototype.hasOwnProperty; var es_obj = { "default": obj }; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (key !== "default" && hop.call(obj, key)) { es_obj[key] = obj[key]; } } } return es_obj; } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("foo");

require("foo-bar");

require("./directory/foo-bar");

var _foo = require("foo2");

var _foo2 = _interopRequireWildcard(_foo);

var _import = require("foo3");

var foo2 = _interopRequireWildcard(_import);

var _bar = require("foo4");

var _bar2 = require("foo5");

exports.test = test;
var test = 5;

exports.test = test;
_bar.bar;
_bar2.foo;
_foo2["default"];
