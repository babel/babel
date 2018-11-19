var Test =
/*#__PURE__*/
function () {
  "use strict";

  function Test() {
    babelHelpers.classCallCheck(this, Test);
    return babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "constructor", this);
  }

  babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      return babelHelpers.get(babelHelpers.getPrototypeOf(Test), "constructor", this);
    }
  }]);
  return Test;
}();

// Instances
expect(Object.getPrototypeOf(Test.prototype)).toBe(Object.prototype);
expect(new Test()).toBe(Object);
// Static
expect(Object.getPrototypeOf(Test)).toBe(Function.prototype);
expect(Test.test()).toBe(Function);
