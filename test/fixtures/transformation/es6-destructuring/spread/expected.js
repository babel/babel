"use strict";

var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };

var isSorted = function (_ref) {
  var _ref2 = _toArray(_ref);

  var x = _ref2[0];
  var y = _ref2[1];

  var wow = _ref2.slice(2);

  if (!zs.length) return true;
  if (y > x) return isSorted(zs);
  return false;
};
