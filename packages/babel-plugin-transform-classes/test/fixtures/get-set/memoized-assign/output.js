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
  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return babelHelpers.callSuper(this, Obj, arguments);
  }
  babelHelpers.inherits(Obj, _Base);
  return babelHelpers.createClass(Obj, [{
    key: "assign",
    value: function assign() {
      var _proper$prop;
      babelHelpers.superPropSet(Obj, _proper$prop = proper.prop, babelHelpers.superPropGet(Obj, _proper$prop, this, 1) + 1, this, 1, 1);
    }
  }, {
    key: "assign2",
    value: function assign2() {
      var _i;
      babelHelpers.superPropSet(Obj, _i = i, babelHelpers.superPropGet(Obj, _i, this, 1) + 1, this, 1, 1);
    }
  }]);
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
