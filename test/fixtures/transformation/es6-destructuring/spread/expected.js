"use strict";

var _toArray = function (arr) { if (Array.isArray(arr)) { var arr2 = []; for (var i = 0; i < arr.length; i++) arr2.push(arr[i]); return arr2; } else { return Array.from(arr); } };

var isSorted = function (_ref) {
  var _ref2 = _toArray(_ref);

  var x = _ref2[0];
  var y = _ref2[1];
  var wow = _toArray(_ref2).slice(2);

  if (!zs.length) return true;
  if (y > x) return isSorted(zs);
  return false;
};
