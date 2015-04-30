"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getForm2 = require("./store");

var Login = (function (_React$Component) {
  function Login() {
    babelHelpers.classCallCheck(this, Login);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  babelHelpers.inherits(Login, _React$Component);
  babelHelpers.createClass(Login, [{
    key: "getForm",
    value: function getForm() {
      return _getForm2.getForm().toJS();
    }
  }]);
  return Login;
})(React.Component);

exports["default"] = Login;
module.exports = exports["default"];
