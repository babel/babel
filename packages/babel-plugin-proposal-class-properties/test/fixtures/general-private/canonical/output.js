var _x, _y;

var Point = function () {
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
    babelHelpers.privateClassPropertyPutNonSpec(this, _x, +x);
    babelHelpers.privateClassPropertyPutNonSpec(this, _y, +y);
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.privateClassPropertyGetNonSpec(this, _x) === babelHelpers.privateClassPropertyGetNonSpec(p, _x) && babelHelpers.privateClassPropertyGetNonSpec(this, _y) === babelHelpers.privateClassPropertyGetNonSpec(p, _y);
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.privateClassPropertyGetNonSpec(this, _x)},${babelHelpers.privateClassPropertyGetNonSpec(this, _y)}>`;
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.privateClassPropertyGetNonSpec(this, _x);
    },
    set: function (value) {
      babelHelpers.privateClassPropertyPutNonSpec(this, _x, +value);
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.privateClassPropertyGetNonSpec(this, _y);
    },
    set: function (value) {
      babelHelpers.privateClassPropertyPutNonSpec(this, _y, +value);
    }
  }]);
  return Point;
}();

_x = babelHelpers.privateClassPropertyKey("x");
_y = babelHelpers.privateClassPropertyKey("y");