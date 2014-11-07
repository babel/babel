"use strict";

var isSorted = function (_ref) {
  var x = _ref[0];
  var y = _ref[1];
  var wow = _ref.slice(2);

  if (!zs.length) return true;
  if (y > x) return isSorted(zs);
  return false;
};
