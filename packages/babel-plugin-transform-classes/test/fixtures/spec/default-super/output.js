var Test = /*#__PURE__*/function () {
  "use strict";

  function Test() {
    babelHelpers.classCallCheck(this, Test);
    return babelHelpers.superPropertyGetCall(Test, "constructor", this, 1);
  }
  return babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      return babelHelpers.superPropertyGetCall(Test, "constructor", this);
    }
  }]);
}(); // Instances
expect(Object.getPrototypeOf(Test.prototype)).toBe(Object.prototype);
expect(new Test()).toBe(Object);

// Static
expect(Object.getPrototypeOf(Test)).toBe(Function.prototype);
expect(Test.test()).toBe(Function);
