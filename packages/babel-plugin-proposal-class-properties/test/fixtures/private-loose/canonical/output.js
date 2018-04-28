var Point =
/*#__PURE__*/
function () {
  "use strict";

  function Point(_x2 = 0, _y2 = 0) {
    babelHelpers.classCallCheck(this, Point);
    Object.defineProperty(this, _x, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _y, {
      writable: true,
      value: void 0
    });
    babelHelpers.classPrivateFieldBase(this, _x)[_x] = +_x2;
    babelHelpers.classPrivateFieldBase(this, _y)[_y] = +_y2;
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.classPrivateFieldBase(this, _x)[_x] === babelHelpers.classPrivateFieldBase(p, _x)[_x] && babelHelpers.classPrivateFieldBase(this, _y)[_y] === babelHelpers.classPrivateFieldBase(p, _y)[_y];
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.classPrivateFieldBase(this, _x)[_x]},${babelHelpers.classPrivateFieldBase(this, _y)[_y]}>`;
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.classPrivateFieldBase(this, _x)[_x];
    },
    set: function (value) {
      babelHelpers.classPrivateFieldBase(this, _x)[_x] = +value;
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.classPrivateFieldBase(this, _y)[_y];
    },
    set: function (value) {
      babelHelpers.classPrivateFieldBase(this, _y)[_y] = +value;
    }
  }]);
  return Point;
}();

var _x = babelHelpers.classPrivateFieldKey("x");

var _y = babelHelpers.classPrivateFieldKey("y");
