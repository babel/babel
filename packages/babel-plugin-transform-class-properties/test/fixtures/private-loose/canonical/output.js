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
    babelHelpers.classPrivateFieldGetLoose(this, _x, 1)[_x] = +x;
    babelHelpers.classPrivateFieldGetLoose(this, _y, 1)[_y] = +y;
  }
  return babelHelpers.createClass(Point, [{
    key: "x",
    get: function () {
      return babelHelpers.classPrivateFieldGetLoose(this, _x);
    },
    set: function (value) {
      babelHelpers.classPrivateFieldGetLoose(this, _x, 1)[_x] = +value;
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.classPrivateFieldGetLoose(this, _y);
    },
    set: function (value) {
      babelHelpers.classPrivateFieldGetLoose(this, _y, 1)[_y] = +value;
    }
  }, {
    key: "equals",
    value: function equals(p) {
      return babelHelpers.classPrivateFieldGetLoose(this, _x) === babelHelpers.classPrivateFieldGetLoose(p, _x) && babelHelpers.classPrivateFieldGetLoose(this, _y) === babelHelpers.classPrivateFieldGetLoose(p, _y);
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.classPrivateFieldGetLoose(this, _x)},${babelHelpers.classPrivateFieldGetLoose(this, _y)}>`;
    }
  }]);
}();
