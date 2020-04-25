var Test = /*#__PURE__*/function () {
  "use strict";

  function Test() {
    var _thisSuper;

    babelHelpers.classCallCheck(this, Test);
    return babelHelpers.get((_thisSuper = this, babelHelpers.getPrototypeOf(Test.prototype)), "constructor", _thisSuper);
  }

  babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      var _thisSuper2;

      return babelHelpers.get((_thisSuper2 = this, babelHelpers.getPrototypeOf(Test)), "constructor", _thisSuper2);
    }
  }]);
  return Test;
}(); // Instances


expect(Object.getPrototypeOf(Test.prototype)).toBe(Object.prototype);
expect(new Test()).toBe(Object); // Static

expect(Object.getPrototypeOf(Test)).toBe(Function.prototype);
expect(Test.test()).toBe(Function);
