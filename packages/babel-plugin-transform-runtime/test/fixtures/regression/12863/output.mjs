import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";

function _appendArrayLike(dest, src, num) { var i = 0, l = dest.length, n = src.length; for (n > num && (n = num > 0 ? num : 0), dest.length += n; i < n;) dest[l++] = src[i++]; return dest; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

let B = /*#__PURE__*/function (_A) {
  _inherits(B, _A);

  var _super = _createSuper(B);

  function B(...args) {
    var _this;

    _classCallCheck(this, B);

    _this = _super.call.apply(_super, _appendArrayLike([this], args));

    _defineProperty(_assertThisInitialized(_this), "b", 8);

    return _this;
  }

  return B;
}(A);
