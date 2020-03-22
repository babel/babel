import _Reflect$construct from "@babel/runtime-corejs2/core-js/reflect/construct";
import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

let Foo = /*#__PURE__*/function (_Bar) {
  _inherits(Foo, _Bar);

  var _super = _createSuper(Foo);

  function Foo() {
    _classCallCheck(this, Foo);

    return _super.apply(this, arguments);
  }

  return Foo;
}(Bar);
