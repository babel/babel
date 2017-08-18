var _x, _y;

var Point = function () {
  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    _x.set(this, void 0);

    _y.set(this, void 0);

    babelHelpers.privateClassPropertyPutSpec(this, _x, +x);
    babelHelpers.privateClassPropertyPutSpec(this, _y, +y);
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.privateClassPropertyGetSpec(this, _x) === babelHelpers.privateClassPropertyGetSpec(p, _x) && babelHelpers.privateClassPropertyGetSpec(this, _y) === babelHelpers.privateClassPropertyGetSpec(p, _y);
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.privateClassPropertyGetSpec(this, _x)},${babelHelpers.privateClassPropertyGetSpec(this, _y)}>`;
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.privateClassPropertyGetSpec(this, _x);
    },
    set: function (value) {
      babelHelpers.privateClassPropertyPutSpec(this, _x, +value);
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.privateClassPropertyGetSpec(this, _y);
    },
    set: function (value) {
      babelHelpers.privateClassPropertyPutSpec(this, _y, +value);
    }
  }]);
  return Point;
}();

_x = new WeakMap();
_y = new WeakMap();