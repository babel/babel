"use strict";

let Base = /*#__PURE__*/babelHelpers.createClass(function Base() {
  babelHelpers.classCallCheck(this, Base);
});

let Obj = /*#__PURE__*/function (_Base) {
  babelHelpers.inherits(Obj, _Base);

  var _super = babelHelpers.createSuper(Obj);

  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Obj, [{
    key: "set",
    value: function set() {
      return babelHelpers.set(babelHelpers.getPrototypeOf(Obj.prototype), "test", 3, this, true);
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
expect(obj.set()).toBe(3);
expect(Base.prototype.test).toBeUndefined();
expect(Obj.prototype.test).toBe(2);
expect(obj.test).toBe(3);
