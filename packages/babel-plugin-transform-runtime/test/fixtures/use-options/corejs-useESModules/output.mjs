import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function () { return !!t; })(); }
let Foo = /*#__PURE__*/function (_Bar) {
  _inherits(Foo, _Bar);
  function Foo() {
    _classCallCheck(this, Foo);
    return _callSuper(this, Foo, arguments);
  }
  return _createClass(Foo);
}(Bar);
