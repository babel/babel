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
    babelHelpers.superPropSet((_this, ColorPoint), "x", 3, _this, 1, 1);
    expect(_this.x).toBe(3); // A
    expect(babelHelpers.superPropGet((_this, ColorPoint), "x", _this, 1)).toBeUndefined(); // B
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
