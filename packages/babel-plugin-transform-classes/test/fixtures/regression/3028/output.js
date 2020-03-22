"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var b = function b() {
  babelHelpers.classCallCheck(this, b);
};

var a1 = /*#__PURE__*/function (_b) {
  babelHelpers.inherits(a1, _b);

  var _super = _createSuper(a1);

  function a1() {
    var _this;

    babelHelpers.classCallCheck(this, a1);
    _this = _super.call(this);

    _this.x = function () {
      return babelHelpers.assertThisInitialized(_this);
    };

    return _this;
  }

  return a1;
}(b);

var a2 = /*#__PURE__*/function (_b2) {
  babelHelpers.inherits(a2, _b2);

  var _super2 = _createSuper(a2);

  function a2() {
    var _this2;

    babelHelpers.classCallCheck(this, a2);
    _this2 = _super2.call(this);

    _this2.x = function () {
      return babelHelpers.assertThisInitialized(_this2);
    };

    return _this2;
  }

  return a2;
}(b);

exports["default"] = a2;
