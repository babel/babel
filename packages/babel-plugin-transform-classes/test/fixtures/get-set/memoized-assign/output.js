"use strict";

let Base = /*#__PURE__*/babelHelpers.createClass(function Base() {
  babelHelpers.classCallCheck(this, Base);
});
Object.defineProperty(Base.prototype, 0, {
  value: 0,
  writable: true,
  configurable: true
});
Object.defineProperty(Base.prototype, 1, {
  value: 1,
  writable: true,
  configurable: true
});
let i = 0;
const proper = {
  get prop() {
    return i++;
  }
};
let Obj = /*#__PURE__*/function (_Base) {
  babelHelpers.inherits(Obj, _Base);
  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return babelHelpers.callSuper(this, Obj, arguments);
  }
  babelHelpers.createClass(Obj, [{
    key: "assign",
    value: function assign() {
      var _proper$prop;
      babelHelpers.set(babelHelpers.getPrototypeOf(Obj.prototype), _proper$prop = proper.prop, babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), _proper$prop, this) + 1, this, true);
    }
  }, {
    key: "assign2",
    value: function assign2() {
      var _i;
      babelHelpers.set(babelHelpers.getPrototypeOf(Obj.prototype), _i = i, babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), _i, this) + 1, this, true);
    }
  }]);
  return Obj;
}(Base);
const obj = new Obj();
obj.assign();
expect(i).toBe(1);
expect(obj[0]).toBe(1);
expect(obj[1]).toBe(1);
obj.assign2();
expect(i).toBe(1);
expect(obj[0]).toBe(1);
expect(obj[1]).toBe(2);
