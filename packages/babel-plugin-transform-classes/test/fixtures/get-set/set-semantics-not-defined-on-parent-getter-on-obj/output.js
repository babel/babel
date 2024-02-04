"use strict";

let Base = /*#__PURE__*/babelHelpers.createClass(function Base() {
  babelHelpers.classCallCheck(this, Base);
});
let Obj = /*#__PURE__*/function (_Base) {
  babelHelpers.inherits(Obj, _Base);
  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return babelHelpers.callSuper(this, Obj, arguments);
  }
  babelHelpers.createClass(Obj, [{
    key: "test",
    get: function () {}
  }, {
    key: "set",
    value: function set() {
      return babelHelpers.set(babelHelpers.getPrototypeOf(Obj.prototype), "test", 3, this, true);
    }
  }]);
  return Obj;
}(Base);
const obj = new Obj();
expect(obj.set()).toBe(3);
expect(Base.prototype.test).toBeUndefined();
expect(Obj.prototype.test).toBeUndefined();
expect(obj.test).toBe(3);
