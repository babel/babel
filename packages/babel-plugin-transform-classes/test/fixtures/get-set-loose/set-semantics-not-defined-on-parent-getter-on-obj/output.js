"use strict";

let Base = function Base() {};
let called = false;
let Obj = /*#__PURE__*/function (_Base) {
  babelHelpers.inheritsLoose(Obj, _Base);
  function Obj() {
    return _Base.apply(this, arguments) || this;
  }
  var _proto = Obj.prototype;
  _proto.set = function set() {
    return this.test = 3;
  };
  babelHelpers.createClass(Obj, [{
    key: "test",
    get: function () {
      called = true;
    }
  }]);
  return Obj;
}(Base);
const obj = new Obj();
// This is incorrect according to the spec,
// but close enough for loose.
// expect(obj.set()).toBe(3);
expect(() => {
  obj.set();
}).toThrow(TypeError);
expect(called).toBe(false);
expect(Base.prototype.test).toBeUndefined();
expect(Obj.prototype.test).toBeUndefined();
expect(obj.test).toBe(undefined);
