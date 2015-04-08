"use strict";

var _events2 = require("events");

var _events3 = babelHelpers.interopRequireWildcard(_events2);

var Template = (function () {
  function Template() {
    babelHelpers.classCallCheck(this, Template);
  }

  babelHelpers.createClass(Template, [{
    key: "events",
    value: (function (_events) {
      function events() {
        return _events.apply(this, arguments);
      }

      events.toString = function () {
        return _events.toString();
      };

      return events;
    })(function () {
      return _events3["default"];
    })
  }]);
  return Template;
})();

console.log(new Template().events());
