"use strict";

let Base = function Base() {};
let value = 2;
let Obj = /*#__PURE__*/function (_Base) {
  function Obj() {
    return _Base.apply(this, arguments) || this;
  }
  babelHelpers.inheritsLoose(Obj, _Base);
  var _proto = Obj.prototype;
  _proto.set = function set() {
    return this.test = 3;
  };
  return babelHelpers.createClass(Obj, [{
    key: "test",
    set: function (v) {
      value = v;
    }
  }]);
}(Base);
const obj = new Obj();
expect(obj.set()).toBe(3);
expect(Base.prototype.test).toBeUndefined();
expect(Obj.prototype.test).toBeUndefined();

// This is incorrect according to the spec,
// but close enough for loose.
expect(value).toBe(3);
expect(obj.test).toBe(undefined);
