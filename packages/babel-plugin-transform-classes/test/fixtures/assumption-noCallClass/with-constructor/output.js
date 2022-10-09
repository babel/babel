var A = /*#__PURE__*/babelHelpers.createClass(function A() {
  "use strict";

  console.log('a');
});
var B = /*#__PURE__*/function () {
  "use strict";

  function B() {}
  babelHelpers.createClass(B, [{
    key: "b",
    value: function b() {
      console.log('b');
    }
  }]);
  return B;
}();
