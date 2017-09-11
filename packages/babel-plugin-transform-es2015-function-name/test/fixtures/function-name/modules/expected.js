"use strict";

var _events2 = require("events");

var _events3 = babelHelpers.interopRequireDefault(_events2);

let Template =
/*#__PURE__*/
function () {
  function Template() {
    babelHelpers.classCallCheck(this, Template);
  }

  babelHelpers.createClass(Template, [{
    key: "events",
    value: function events() {
      return _events3.default;
    }
  }]);
  return Template;
}();

console.log(new Template().events());
