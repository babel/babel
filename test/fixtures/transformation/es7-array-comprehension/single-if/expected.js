"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var arr = _toArray(nums).filter(function (i) {
  return i > 1;
}).map(function (i) {
  return i * i;
});
