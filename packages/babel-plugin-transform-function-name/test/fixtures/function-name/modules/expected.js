"use strict";

var _events2 = babelHelpers.interopRequireDefault(require("events"));

let Template = (0,
/*#__PURE__*/
function () {
  function Template() {
    babelHelpers.classCallCheck(this, Template);
  }

  babelHelpers.createClass(Template, [{
    key: "events",
    value: function events() {
      return _events2.default;
    }
  }]);
  return Template;
}());
console.log(new Template().events());
