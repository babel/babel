var _x = /*#__PURE__*/new WeakMap();
var _y = /*#__PURE__*/new WeakMap();
var Point = /*#__PURE__*/function () {
  "use strict";

  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);
    babelHelpers.classPrivateFieldInitSpec(this, _x, {
      writable: true,
      value: void 0
    });
    babelHelpers.classPrivateFieldInitSpec(this, _y, {
      writable: true,
      value: void 0
    });
    babelHelpers.classPrivateFieldSet(this, _x, +x);
    babelHelpers.classPrivateFieldSet(this, _y, +y);
  }
  babelHelpers.createClass(Point, [{
    key: "x",
    get: function () {
      return babelHelpers.classPrivateFieldGet(this, _x);
    },
    set: function (value) {
      babelHelpers.classPrivateFieldSet(this, _x, +value);
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.classPrivateFieldGet(this, _y);
    },
    set: function (value) {
      babelHelpers.classPrivateFieldSet(this, _y, +value);
    }
  }, {
    key: "equals",
    value: function equals(p) {
      return babelHelpers.classPrivateFieldGet(this, _x) === babelHelpers.classPrivateFieldGet(p, _x) && babelHelpers.classPrivateFieldGet(this, _y) === babelHelpers.classPrivateFieldGet(p, _y);
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.classPrivateFieldGet(this, _x)},${babelHelpers.classPrivateFieldGet(this, _y)}>`;
    }
  }]);
  return Point;
}();
