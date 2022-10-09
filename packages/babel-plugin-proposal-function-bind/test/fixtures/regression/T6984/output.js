function _one() {}
function _two() {}
let Test1 = /*#__PURE__*/function () {
  "use strict";

  function Test1() {
    babelHelpers.classCallCheck(this, Test1);
  }
  babelHelpers.createClass(Test1, [{
    key: "one",
    value: function one() {
      _two.call(_one, 1, 2);
    }
  }, {
    key: "two",
    value: function two() {
      _two.call(_one, 1, 2);
    }
  }]);
  return Test1;
}();
