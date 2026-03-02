"use strict";

let called = false;
let Base = /*#__PURE__*/function () {
  function Base() {}
  return babelHelpers.createClass(Base, [{
    key: "test",
    get: function () {
      called = true;
      return 1;
    }
  }]);
}();
;
let Obj = /*#__PURE__*/function (_Base) {
  function Obj() {
    return _Base.apply(this, arguments) || this;
  }
  babelHelpers.inheritsLoose(Obj, _Base);
  var _proto = Obj.prototype;
  _proto.set = function set() {
    return this.test = 3;
  };
  return Obj;
}(Base);
Object.defineProperty(Obj.prototype, 'test', {
  value: 2,
  writable: true,
  configurable: true
});
const obj = new Obj();

// This is incorrect according to the spec,
// but close enough for loose.
// expect(() => {
expect(obj.set()).toBe(3);
// }).toThrow(TypeError);

expect(called).toBe(false);
expect(Base.prototype.test).toBe(1);
expect(Obj.prototype.test).toBe(2);
expect(obj.test).toBe(3);
