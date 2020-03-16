function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var A = function A() {
  "use strict";

  babelHelpers.classCallCheck(this, A);
};

var B = /*#__PURE__*/function (_A) {
  "use strict";

  babelHelpers.inherits(B, _A);

  var _super = _createSuper(B);

  function B() {
    var _this;

    babelHelpers.classCallCheck(this, B);
    return babelHelpers.possibleConstructorReturn(_this, _this = _super.call(this));
  }

  return B;
}(A);
