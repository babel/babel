"use strict";

let Base = /*#__PURE__*/babelHelpers.createClass(function Base() {
  babelHelpers.classCallCheck(this, Base);
});
let Obj = /*#__PURE__*/function (_Base) {
  babelHelpers.inherits(Obj, _Base);
  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return babelHelpers.callSuper(this, Obj, arguments);
  }
  babelHelpers.createClass(Obj, [{
    key: "call",
    value: function call() {
      return babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), "test", this).call(this);
    }
  }, {
    key: "test",
    value: function test() {
      throw new Error("gobbledygook");
    }
  }]);
  return Obj;
}(Base);
const obj = new Obj();
expect(() => {
  obj.call();

  // Assert that this throws, but that it's not
  // Obj.p.test's error that is thrown
}).toThrow(TypeError);
