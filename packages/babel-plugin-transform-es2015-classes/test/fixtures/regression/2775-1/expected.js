'use strict';

var _ = require('underscore'),
    React = require('react');

var Hello = (function (_React$Component) {
    babelHelpers.inherits(Hello, _React$Component);

    function Hello() {
        var _temp, _this;

        babelHelpers.classCallCheck(this, Hello);
        return babelHelpers.possibleConstructorReturn(_this, (_temp = (_this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Hello).apply(this, arguments)), _this), _this.state = {
            hello: 1
        }, _temp));
    }

    babelHelpers.createClass(Hello, [{
        key: 'render',

        /*
            constructor() {
                super();
            }
        */

        value: function render() {
            var props = _.omit(this.props, 'children');
            return React.createElement(
                'p',
                babelHelpers.extends({ className: '1' }, props),
                'Hello'
            );
        }
    }, {
        key: 'foo',
        value: function foo() {
            var param = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            this.param = param;
        }
    }]);
    return Hello;
})(React.Component);

module.exports = Hello;
