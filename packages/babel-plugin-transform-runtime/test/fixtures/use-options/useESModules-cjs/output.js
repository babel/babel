var _classCallCheck = require("@babel/runtime/helpers/classCallCheck").default;

var _inherits = require("@babel/runtime/helpers/inherits").default;

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn").default;

var _getPrototypeOf = require("@babel/runtime/helpers/getPrototypeOf").default;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

let Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  _inherits(Foo, _Bar);

  var _super = _createSuper(Foo);

  function Foo() {
    _classCallCheck(this, Foo);

    return _super.apply(this, arguments);
  }

  return Foo;
}(Bar);
