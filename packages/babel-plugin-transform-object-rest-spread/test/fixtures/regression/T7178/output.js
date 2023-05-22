"use strict";

var _props = babelHelpers.interopRequireDefault(require("props"));
console.log(_props.default);
(function () {
  const props = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(this.props), this.props));
  console.log(props);
})();
