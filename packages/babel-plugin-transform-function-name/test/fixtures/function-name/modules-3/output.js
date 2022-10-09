"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _store = require("./store");
let Login = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Login, _React$Component);
  var _super = babelHelpers.createSuper(Login);
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
