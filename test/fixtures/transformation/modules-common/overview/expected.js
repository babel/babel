"use strict";

require("foo");

require("foo-bar");

require("./directory/foo-bar");

var foo = require("foo")["default"];
var foo = require("foo");

var bar = require("foo").bar;
var bar = require("foo").foo;
exports.test = test;
var test = exports.test = 5;

exports["default"] = test;
