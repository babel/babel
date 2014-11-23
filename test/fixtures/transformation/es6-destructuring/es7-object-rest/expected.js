"use strict";

var _objectSpread = function (obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var x = _objectSpread(z, []);

var x = z.x;
var y = _objectSpread(z, ["x"]);

(function (_ref) {
  var x = _ref.x;
  var y = _objectSpread(_ref, ["x"]);
});
