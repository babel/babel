var Test = /*#__PURE__*/function () {
  "use strict";

  function Test() {
    babelHelpers.classCallCheck(this, Test);
    return Object.prototype.constructor;
  }
  babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      return Function.prototype.constructor;
    }
  }]);
  return Test;
}(); // Instances
expect(Object.getPrototypeOf(Test.prototype)).toBe(Object.prototype);
expect(new Test()).toBe(Object);

// Static
expect(Object.getPrototypeOf(Test)).toBe(Function.prototype);
expect(Test.test()).toBe(Function);
