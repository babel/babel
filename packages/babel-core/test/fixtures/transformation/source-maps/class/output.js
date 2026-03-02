var Test = /*#__PURE__*/function () {
  "use strict";

  function Test() {
    babelHelpers.classCallCheck(this, Test);
  }
  return babelHelpers.createClass(Test, [{
    key: "bar",
    get: function () {
      throw new Error("wow");
    }
  }]);
}();
var test = new Test();
test.bar;
