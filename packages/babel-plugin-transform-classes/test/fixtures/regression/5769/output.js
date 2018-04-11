var Point =
/*#__PURE__*/
function () {
  "use strict";

  function Point() {
    babelHelpers.classCallCheck(this, Point);
  }

  babelHelpers.createClass(Point, [{
    key: "getX",
    value: function getX() {
      assert.equal(this.x, 3); // C
    }
  }]);
  return Point;
}();

var ColorPoint =
/*#__PURE__*/
function (_Point) {
  "use strict";

  babelHelpers.inherits(ColorPoint, _Point);

  function ColorPoint() {
    var _this;

    babelHelpers.classCallCheck(this, ColorPoint);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(ColorPoint).call(this));
    _this.x = 2;
    babelHelpers.set(babelHelpers.getPrototypeOf(ColorPoint.prototype), "x", 3, _this, true);
    assert.equal(_this.x, 3); // A

    assert.equal(babelHelpers.get(babelHelpers.getPrototypeOf(ColorPoint.prototype), "x", babelHelpers.assertThisInitialized(_this)), undefined); // B

    return _this;
  }

  babelHelpers.createClass(ColorPoint, [{
    key: "m",
    value: function m() {
      this.getX();
    }
  }]);
  return ColorPoint;
}(Point);

var cp = new ColorPoint();
cp.m();
