"use strict";

var _events = babelHelpers.interopRequireDefault(require("events"));

let Template = function () {
  function Template() {
    babelHelpers.classCallCheck(this, Template);
  }

  babelHelpers.createClass(Template, [{
    key: "events",
    value: function events() {
      return _events;
    }
  }]);
  return Template;
}();

console.log(new Template().events());
