var _x = /*#__PURE__*/new WeakMap();
var _y = /*#__PURE__*/new WeakMap();
let Point = /*#__PURE__*/function () {
  "use strict";

  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);
    babelHelpers.classPrivateFieldInitSpec(this, _x, void 0);
    babelHelpers.classPrivateFieldInitSpec(this, _y, void 0);
    babelHelpers.classPrivateFieldSet2(_x, this, +x);
    babelHelpers.classPrivateFieldSet2(_y, this, +y);
  }
  return babelHelpers.createClass(Point, [{
    key: "x",
    get: function () {
      return babelHelpers.classPrivateFieldGet2(_x, this);
    },
    set: function (value) {
      babelHelpers.classPrivateFieldSet2(_x, this, +value);
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.classPrivateFieldGet2(_y, this);
    },
    set: function (value) {
      babelHelpers.classPrivateFieldSet2(_y, this, +value);
    }
  }, {
    key: "equals",
    value: function equals(p) {
      return babelHelpers.classPrivateFieldGet2(_x, this) === babelHelpers.classPrivateFieldGet2(_x, p) && babelHelpers.classPrivateFieldGet2(_y, this) === babelHelpers.classPrivateFieldGet2(_y, p);
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.classPrivateFieldGet2(_x, this)},${babelHelpers.classPrivateFieldGet2(_y, this)}>`;
    }
  }]);
}();
