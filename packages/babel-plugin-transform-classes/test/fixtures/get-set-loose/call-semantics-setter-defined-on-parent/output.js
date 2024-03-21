"use strict";

let Base = /*#__PURE__*/function () {
  function Base() {}
  return babelHelpers.createClass(Base, [{
    key: "test",
    set: function (v) {
      throw new Error("gobbledygook");
    }
  }]);
}();
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

  // Asser that this throws, but that it's not
  // a gobbledygook error that is thrown
}).toThrow(TypeError);
