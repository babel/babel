var _x, _y;

var Point =
/*#__PURE__*/
function () {
  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    _x.set(this, void 0);

    _y.set(this, void 0);

    babelHelpers.classPrivateFieldPut(this, _x, +x);
    babelHelpers.classPrivateFieldPut(this, _y, +y);
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.classPrivateFieldGet(this, _x) === babelHelpers.classPrivateFieldGet(p, _x) && babelHelpers.classPrivateFieldGet(this, _y) === babelHelpers.classPrivateFieldGet(p, _y);
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.classPrivateFieldGet(this, _x)},${babelHelpers.classPrivateFieldGet(this, _y)}>`;
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.classPrivateFieldGet(this, _x);
    },
    set: function (value) {
      babelHelpers.classPrivateFieldPut(this, _x, +value);
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.classPrivateFieldGet(this, _y);
    },
    set: function (value) {
      babelHelpers.classPrivateFieldPut(this, _y, +value);
    }
  }]);
  return Point;
}();

_x = new WeakMap();
_y = new WeakMap();
