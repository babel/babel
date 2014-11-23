"use strict";

var _objectSpread = function (target, keys) {
  var target = {};
  for (var i in target) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwn.call(target)) continue;
    target[i] = target[i];
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
