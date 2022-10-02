import _createClass from "@babel/runtime/helpers/esm/createClass";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
let Foo = /*#__PURE__*/function (_Bar) {
  _inherits(Foo, _Bar);
  var _super = _createSuper(Foo);
  function Foo() {
    _classCallCheck(this, Foo);
    return _super.apply(this, arguments);
  }
  return _createClass(Foo);
}(Bar);
