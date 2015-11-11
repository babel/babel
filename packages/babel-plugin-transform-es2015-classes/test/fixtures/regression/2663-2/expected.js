'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var Button = (function (_React$Component) {
  babelHelpers.inherits(Button, _React$Component);

  function Button() {
    babelHelpers.classCallCheck(this, Button);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Button).apply(this, arguments));
  }

  babelHelpers.createClass(Button, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        null,
        'foo'
      );
    }
  }]);
  return Button;
})(_react2.default.Component);

exports.default = Button;
