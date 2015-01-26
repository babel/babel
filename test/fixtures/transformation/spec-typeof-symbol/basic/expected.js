"use strict";

var _typeof = function (obj) { return obj && obj.constructor === Symbol ? "symbol" : typeof obj; };

var s = Symbol("s");
assert.equal(typeof s === "undefined" ? "undefined" : _typeof(s), "symbol");