import React, { Component } from 'react';
var RandomComponent = /*#__PURE__*/function (_Component) {
  function RandomComponent() {
    babelHelpers.classCallCheck(this, RandomComponent);
    return babelHelpers.callSuper(this, RandomComponent);
  }
  babelHelpers.inherits(RandomComponent, _Component);
  return babelHelpers.createClass(RandomComponent, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "sui-RandomComponent"
      }, /*#__PURE__*/React.createElement("h2", null, "Hi there!"));
    }
  }]);
}(Component);
export { RandomComponent as default };
