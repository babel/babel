"use strict";

let value = 1;
let Base = /*#__PURE__*/function () {
  function Base() {}
  return babelHelpers.createClass(Base, [{
    key: "test",
    set: function (v) {
      value = v;
    }
  }]);
}();
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
expect(obj.set()).toBe(3);

// This is incorrect according to the spec,
// but close enough for loose.
// expect(value).toBe(3);
expect(value).toBe(1);
expect(Base.prototype.test).toBeUndefined();
expect(Obj.prototype.test).toBe(2);

// This is incorrect according to the spec,
// but close enough for loose.
// expect(obj.test).toBe(2);
expect(obj.test).toBe(3);
