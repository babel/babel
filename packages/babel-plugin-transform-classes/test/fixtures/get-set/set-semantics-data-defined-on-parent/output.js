"use strict";

let Base = /*#__PURE__*/babelHelpers.createClass(function Base() {
  babelHelpers.classCallCheck(this, Base);
});
Object.defineProperty(Base.prototype, 'test', {
  value: 1,
  writable: true,
  configurable: true
});
let Obj = /*#__PURE__*/function (_Base) {
  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return babelHelpers.callSuper(this, Obj, arguments);
  }
  babelHelpers.inherits(Obj, _Base);
  return babelHelpers.createClass(Obj, [{
    key: "set",
    value: function set() {
      return babelHelpers.superPropSet(Obj, "test", 3, this, 1, 1);
    }
  }]);
}(Base);
Object.defineProperty(Obj.prototype, 'test', {
  value: 2,
  writable: true,
  configurable: true
});
const obj = new Obj();
expect(obj.set()).toBe(3);
expect(Base.prototype.test).toBe(1);
expect(Obj.prototype.test).toBe(2);
expect(obj.test).toBe(3);
