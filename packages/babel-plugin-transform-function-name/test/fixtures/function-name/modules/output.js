"use strict";

var _events2 = babelHelpers.interopRequireDefault(require("events"));
let Template = /*#__PURE__*/function () {
  function Template() {
    babelHelpers.classCallCheck(this, Template);
  }
  return babelHelpers.createClass(Template, [{
    key: "events",
    value: function events() {
      return _events2.default;
    }
  }]);
}();
console.log(new Template().events());
