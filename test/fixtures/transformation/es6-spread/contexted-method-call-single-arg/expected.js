"use strict";

var _foob, _foob$test;
var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

(_foob = foob).add.apply(_foob, _toArray(numbers));
(_foob$test = foob.test).add.apply(_foob$test, _toArray(numbers));
