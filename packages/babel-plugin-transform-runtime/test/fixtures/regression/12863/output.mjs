import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function () { return !!t; })(); }
let B = /*#__PURE__*/function (_A) {
  _inherits(B, _A);
  function B(...args) {
    var _context;
    var _this;
    _classCallCheck(this, B);
    _this = _callSuper(this, B, _concatInstanceProperty(_context = []).call(_context, args));
    _defineProperty(_assertThisInitialized(_this), "b", 8);
    return _this;
  }
  return _createClass(B);
}(A);
