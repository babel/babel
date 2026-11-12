"use strict";

let Base = /*#__PURE__*/function () {
  function Base() {}
  var _proto = Base.prototype;
  babelHelpers.defineAccessor("set", _proto, "test", function (v) {
    throw new Error("gobbledygook");
  });
  return Base;
}();
let Obj = /*#__PURE__*/function (_Base) {
  function Obj() {
    return _Base.apply(this, arguments) || this;
  }
  babelHelpers.inheritsLoose(Obj, _Base);
  var _proto2 = Obj.prototype;
  _proto2.call = function call() {
    return _Base.prototype.test.call(this);
  };
  _proto2.test = function test() {
    throw new Error("gobbledygook");
  };
  return Obj;
}(Base);
const obj = new Obj();
expect(() => {
  obj.call();

  // Assert that this throws, but that it's not
  // a gobbledygook error that is thrown
}).toThrow(TypeError);
