"use strict";

var _one = require("one");

var _one2 = babelHelpers.interopRequireDefault(_one);

var _two = require("two");

var _three = require("three");

var _four = require("four");

var aNamespace = babelHelpers.interopRequireWildcard(_four);


console.log(_one2.default);
console.log(_two.aNamed);
console.log(_three.orig);
console.log(aNamespace);

console.log((0, _one2.default)());
console.log((0, _two.aNamed)());
console.log((0, _three.orig)());
console.log(aNamespace());
