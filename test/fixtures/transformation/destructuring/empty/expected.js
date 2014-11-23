"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var _ref = ["foo", "hello", [", ", "junk"], ["world"]];

var _ref2 = _toArray(_ref);

var a = _ref2[1];
var _ref3 = _toArray(_ref2[2]);

var b = _ref3[0];
var _ref4 = _toArray(_ref2[3]);

var c = _ref4[0];
var d = _ref2[4];
