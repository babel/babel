var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
var _y = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("y");
var Point = /*#__PURE__*/function () {
  "use strict";

  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);
    Object.defineProperty(this, _x, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _y, {
      writable: true,
      value: void 0
    });
    babelHelpers.classPrivateFieldLooseBase(this, _x)[_x] = +x;
    babelHelpers.classPrivateFieldLooseBase(this, _y)[_y] = +y;
  }
  babelHelpers.createClass(Point, [{
    key: "x",
    get: function () {
      return babelHelpers.classPrivateFieldLooseBase(this, _x)[_x];
    },
    set: function (value) {
      babelHelpers.classPrivateFieldLooseBase(this, _x)[_x] = +value;
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.classPrivateFieldLooseBase(this, _y)[_y];
    },
    set: function (value) {
      babelHelpers.classPrivateFieldLooseBase(this, _y)[_y] = +value;
    }
  }, {
    key: "equals",
    value: function equals(p) {
      return babelHelpers.classPrivateFieldLooseBase(this, _x)[_x] === babelHelpers.classPrivateFieldLooseBase(p, _x)[_x] && babelHelpers.classPrivateFieldLooseBase(this, _y)[_y] === babelHelpers.classPrivateFieldLooseBase(p, _y)[_y];
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.classPrivateFieldLooseBase(this, _x)[_x]},${babelHelpers.classPrivateFieldLooseBase(this, _y)[_y]}>`;
    }
  }]);
  return Point;
}();
