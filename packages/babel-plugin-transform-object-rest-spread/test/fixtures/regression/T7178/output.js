"use strict";

var _props = babelHelpers.interopRequireDefault(require("props"));
console.log(_props.default);
(function () {
  const _this$props = this.props,
    props = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_this$props), _this$props)), []);
  console.log(props);
})();
