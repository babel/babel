"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : _core.Array.from(arr);
};

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var _core = _interopRequire(require("core-js/library"));

var arr = _toArray(nums).map(function (i) {
  return i * i;
});
