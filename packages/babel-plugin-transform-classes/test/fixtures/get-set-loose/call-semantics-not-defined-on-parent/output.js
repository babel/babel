"use strict";

let Base = function Base() {};
let Obj = /*#__PURE__*/function (_Base) {
  function Obj() {
    return _Base.apply(this, arguments) || this;
  }
  babelHelpers.inheritsLoose(Obj, _Base);
  var _proto = Obj.prototype;
  _proto.call = function call() {
    return _Base.prototype.test.call(this);
  };
  _proto.test = function test() {
    throw new Error("gobbledygook");
  };
  return Obj;
}(Base);
const obj = new Obj();
expect(() => {
  obj.call();

  // Assert that this throws, but that it's not
  // Obj.p.test's error that is thrown
}).toThrow(TypeError);
