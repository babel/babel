"use strict";

let Base = /*#__PURE__*/function () {
  function Base() {}
  return babelHelpers.createClass(Base, [{
    key: "test",
    set: function (v) {
      throw new Error("called");
    }
  }]);
}();
let Obj = /*#__PURE__*/function (_Base) {
  function Obj() {
    return _Base.apply(this, arguments) || this;
  }
  babelHelpers.inheritsLoose(Obj, _Base);
  var _proto = Obj.prototype;
  _proto.get = function get() {
    return _Base.prototype.test;
  };
  return Obj;
}(Base);
Object.defineProperty(Obj.prototype, 'test', {
  value: 2,
  writable: true,
  configurable: true
});
const obj = new Obj();
expect(obj.test).toBe(2);
expect(obj.get()).toBeUndefined();
