function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var A = /*#__PURE__*/function (_B) {
  "use strict";

  babelHelpers.inherits(A, _B);

  var _super = _createSuper(A);

  function A() {
    var _this;

    babelHelpers.classCallCheck(this, A);
    _this = _super.call(this);

    _this.arrow1 = function (x) {
      return x;
    };

    _this.arrow2 = function (x) {
      return x;
    };

    return _this;
  }

  return A;
}(B);
