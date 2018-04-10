var Test =
/*#__PURE__*/
function () {
  "use strict";

  function Test() {
    babelHelpers.classCallCheck(this, Test);
  }

  babelHelpers.createClass(Test, [{
    key: "bar",
    get: function () {
      throw new Error("wow");
    }
  }]);
  return Test;
}();

var test = new Test();
test.bar;
