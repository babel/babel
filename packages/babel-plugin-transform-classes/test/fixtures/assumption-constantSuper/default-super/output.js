var Test = /*#__PURE__*/function () {
  "use strict";

  function Test() {
    babelHelpers.classCallCheck(this, Test);
    return Object.prototype.constructor;
  }
  return babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      return Function.prototype.constructor;
    }
  }]);
}(); // Instances
expect(Object.getPrototypeOf(Test.prototype)).toBe(Object.prototype);
expect(new Test()).toBe(Object);

// Static
expect(Object.getPrototypeOf(Test)).toBe(Function.prototype);
expect(Test.test()).toBe(Function);
