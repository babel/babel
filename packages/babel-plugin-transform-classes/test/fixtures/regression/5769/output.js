var Point = /*#__PURE__*/function () {
  "use strict";

  function Point() {
    babelHelpers.classCallCheck(this, Point);
  }
  return babelHelpers.createClass(Point, [{
    key: "getX",
    value: function getX() {
      expect(this.x).toBe(3); // C
    }
  }]);
}();
var ColorPoint = /*#__PURE__*/function (_Point) {
  "use strict";

  function ColorPoint() {
    var _this;
    babelHelpers.classCallCheck(this, ColorPoint);
    _this = babelHelpers.callSuper(this, ColorPoint);
    _this.x = 2;
    babelHelpers.set((_this, babelHelpers.getPrototypeOf(ColorPoint.prototype)), "x", 3, _this, true);
    expect(_this.x).toBe(3); // A
    expect(babelHelpers.get((_this, babelHelpers.getPrototypeOf(ColorPoint.prototype)), "x", _this)).toBeUndefined(); // B
    return _this;
  }
  babelHelpers.inherits(ColorPoint, _Point);
  return babelHelpers.createClass(ColorPoint, [{
    key: "m",
    value: function m() {
      this.getX();
    }
  }]);
}(Point);
var cp = new ColorPoint();
cp.m();
