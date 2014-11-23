"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

for (var _iterator = this.test.expectation.registers[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
  var _ref = _step.value;
  var _ref2 = _toArray(_ref);

  var name = _ref2[0];
  var before = _ref2[1];
  var after = _ref2[2];
}
