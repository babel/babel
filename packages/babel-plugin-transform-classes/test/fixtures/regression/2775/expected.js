"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireWildcard(require("react"));

var RandomComponent =
/*#__PURE__*/
function (_Component) {
  babelHelpers.inherits(RandomComponent, _Component);

  function RandomComponent() {
    babelHelpers.classCallCheck(this, RandomComponent);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(RandomComponent, [], this));
  }

  babelHelpers.createClass(RandomComponent, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "sui-RandomComponent"
      }, _react.default.createElement("h2", null, "Hi there!"));
    }
  }]);
  return RandomComponent;
}(_react.Component);

exports.default = RandomComponent;
