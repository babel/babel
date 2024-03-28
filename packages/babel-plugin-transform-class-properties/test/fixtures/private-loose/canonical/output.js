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
    babelHelpers.assertClassBrandLoose(this, _x)[_x] = +x;
    babelHelpers.assertClassBrandLoose(this, _y)[_y] = +y;
  }
  return babelHelpers.createClass(Point, [{
    key: "x",
    get: function () {
      return babelHelpers.assertClassBrandLoose(this, _x, 1);
    },
    set: function (value) {
      babelHelpers.assertClassBrandLoose(this, _x)[_x] = +value;
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.assertClassBrandLoose(this, _y, 1);
    },
    set: function (value) {
      babelHelpers.assertClassBrandLoose(this, _y)[_y] = +value;
    }
  }, {
    key: "equals",
    value: function equals(p) {
      return babelHelpers.assertClassBrandLoose(this, _x, 1) === babelHelpers.assertClassBrandLoose(p, _x, 1) && babelHelpers.assertClassBrandLoose(this, _y, 1) === babelHelpers.assertClassBrandLoose(p, _y, 1);
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.assertClassBrandLoose(this, _x, 1)},${babelHelpers.assertClassBrandLoose(this, _y, 1)}>`;
    }
  }]);
}();
