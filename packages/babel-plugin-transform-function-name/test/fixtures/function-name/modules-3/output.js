"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = require("./store");

function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

let Login = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Login, _React$Component);

  var _super = _createSuper(Login);

  function Login() {
    babelHelpers.classCallCheck(this, Login);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Login, [{
    key: "getForm",
    value: function getForm() {
      return (0, _store.getForm)().toJS();
    }
  }]);
  return Login;
}(React.Component);

exports.default = Login;
