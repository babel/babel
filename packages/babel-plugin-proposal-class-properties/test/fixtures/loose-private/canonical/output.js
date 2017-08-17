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
    this[_x] = +x;
    this[_y] = +y;
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return this[_x] === p[_x] && this[_y] === p[_y];
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${this[_x]},${this[_y]}>`;
    }
  }, {
    key: "x",
    get: function () {
      return this[_x];
    },
    set: function (value) {
      this[_x] = +value;
    }
  }, {
    key: "y",
    get: function () {
      return this[_y];
    },
    set: function (value) {
      this[_y] = +value;
    }
  }]);
  return Point;
}();

_x = babelHelpers.privateClassPropertyKey("x");
_y = babelHelpers.privateClassPropertyKey("y");