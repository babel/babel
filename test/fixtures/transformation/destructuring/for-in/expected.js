"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

for (var _ref in obj) {
  var _ref2 = _toArray(_ref);

  var name = _ref2[0];
  var value = _ref2[1];
  print("Name: " + name + ", Value: " + value);
}
