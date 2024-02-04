"use strict";

let Base = /*#__PURE__*/function () {
  function Base() {
    babelHelpers.classCallCheck(this, Base);
  }
  babelHelpers.createClass(Base, [{
    key: "test",
    get: function () {
      expect(this).toBe(obj);
      return 1;
    }
  }]);
  return Base;
}();
let Obj = /*#__PURE__*/function (_Base) {
  babelHelpers.inherits(Obj, _Base);
  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return babelHelpers.callSuper(this, Obj, arguments);
  }
  babelHelpers.createClass(Obj, [{
    key: "get",
    value: function get() {
      return babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), "test", this);
    }
  }]);
  return Obj;
}(Base);
Object.defineProperty(Obj.prototype, 'test', {
  value: 2,
  writable: true,
  configurable: true
});
const obj = new Obj();
expect(obj.test).toBe(2);
expect(obj.get()).toBe(1);
