function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Point = /*#__PURE__*/function () {
  "use strict";

  function Point() {
    babelHelpers.classCallCheck(this, Point);
  }

  babelHelpers.createClass(Point, [{
    key: "getX",
    value: function getX() {
      expect(this.x).toBe(3); // C
    }
  }]);
  return Point;
}();

var ColorPoint = /*#__PURE__*/function (_Point) {
  "use strict";

  babelHelpers.inherits(ColorPoint, _Point);

  var _super = _createSuper(ColorPoint);

  function ColorPoint() {
    var _thisSuper, _thisSuper2, _this;

    babelHelpers.classCallCheck(this, ColorPoint);
    _this = _super.call(this);
    _this.x = 2;
    babelHelpers.set((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(ColorPoint.prototype)), "x", 3, _thisSuper, true);
    expect(_this.x).toBe(3); // A

    expect(babelHelpers.get((_thisSuper2 = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(ColorPoint.prototype)), "x", _thisSuper2)).toBeUndefined(); // B

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
