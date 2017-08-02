"use strict";

var _props = require("props");

var _props2 = babelHelpers.interopRequireDefault(_props);

console.log(_props2.default);

(function () {
  const props = babelHelpers.objectWithoutProperties(this.props, []);
  console.log(props);
})();
