"use strict";

var _copyPaste = require("./copyPaste");
var Thing = /*#__PURE__*/function () {
  function Thing() {
    babelHelpers.classCallCheck(this, Thing);
  }
  babelHelpers.createClass(Thing, [{
    key: "handleCopySomething",
    value: function handleCopySomething() {
      (0, _copyPaste.copy)();
    }
  }, {
    key: "completelyUnrelated",
    value: function completelyUnrelated() {
      var copy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 123;
    }
  }]);
  return Thing;
}();
