"use strict";

var props = babelHelpers.interopRequireDefault(require("props"));
console.log(props);

(function () {
  const props = babelHelpers.objectWithoutProperties(this.props, []);
  console.log(props);
})();
