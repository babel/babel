var _x = /*#__PURE__*/new WeakMap(),
    _y = /*#__PURE__*/new WeakMap();

var Point = /*#__PURE__*/function () {
  "use strict";

  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    _x.set(this, void 0);

    _y.set(this, void 0);

    babelHelpers.classPrivateFieldSet2(this, _x, +x);
    babelHelpers.classPrivateFieldSet2(this, _y, +y);
  }

  babelHelpers.createClass(Point, [{
    key: "x",
    get: function () {
      return babelHelpers.classPrivateFieldGet2(this, _x);
    },
    set: function (value) {
      babelHelpers.classPrivateFieldSet2(this, _x, +value);
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.classPrivateFieldGet2(this, _y);
    },
    set: function (value) {
      babelHelpers.classPrivateFieldSet2(this, _y, +value);
    }
  }, {
    key: "equals",
    value: function equals(p) {
      return babelHelpers.classPrivateFieldGet2(this, _x) === babelHelpers.classPrivateFieldGet2(p, _x) && babelHelpers.classPrivateFieldGet2(this, _y) === babelHelpers.classPrivateFieldGet2(p, _y);
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.classPrivateFieldGet2(this, _x)},${babelHelpers.classPrivateFieldGet2(this, _y)}>`;
    }
  }]);
  return Point;
}();
