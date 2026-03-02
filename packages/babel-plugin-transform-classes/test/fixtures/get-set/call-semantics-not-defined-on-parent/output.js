"use strict";

let Base = /*#__PURE__*/babelHelpers.createClass(function Base() {
  babelHelpers.classCallCheck(this, Base);
});
let Obj = /*#__PURE__*/function (_Base) {
  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return babelHelpers.callSuper(this, Obj, arguments);
  }
  babelHelpers.inherits(Obj, _Base);
  return babelHelpers.createClass(Obj, [{
    key: "call",
    value: function call() {
      return babelHelpers.superPropGet(Obj, "test", this, 3)([]);
    }
  }, {
    key: "test",
    value: function test() {
      throw new Error("gobbledygook");
    }
  }]);
}(Base);
const obj = new Obj();
expect(() => {
  obj.call();

  // Assert that this throws, but that it's not
  // Obj.p.test's error that is thrown
}).toThrow(TypeError);
