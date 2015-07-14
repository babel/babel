"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require("./store");

var Login = (function (_React$Component) {
  babelHelpers.inherits(Login, _React$Component);

  function Login() {
    babelHelpers.classCallCheck(this, Login);
    babelHelpers.get(Object.getPrototypeOf(Login.prototype), "constructor", this).apply(this, arguments);
  }

  babelHelpers.createClass(Login, [{
    key: "getForm",
    value: function getForm() {
      return (0, _store.getForm)().toJS();
    }
  }]);
  return Login;
})(React.Component);

exports["default"] = Login;
module.exports = exports["default"];
