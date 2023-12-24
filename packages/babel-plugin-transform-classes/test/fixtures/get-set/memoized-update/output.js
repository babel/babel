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
    key: "update",
    value: function update() {
      var _proper$prop, _super$proper$prop, _super$proper$prop2;
      babelHelpers.set(babelHelpers.getPrototypeOf(Obj.prototype), _proper$prop = proper.prop, (_super$proper$prop = babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), _proper$prop, this), _super$proper$prop2 = _super$proper$prop++, _super$proper$prop), this, true), _super$proper$prop2;
    }
  }, {
    key: "update2",
    value: function update2() {
      var _i, _super$i, _super$i2;
      babelHelpers.set(babelHelpers.getPrototypeOf(Obj.prototype), _i = i, (_super$i = babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), _i, this), _super$i2 = _super$i++, _super$i), this, true), _super$i2;
    }
  }]);
  return Obj;
}(Base);
const obj = new Obj();
obj.update();
expect(i).toBe(1);
expect(obj[0]).toBe(1);
expect(obj[1]).toBe(1);
obj.update2();
expect(i).toBe(1);
expect(obj[0]).toBe(1);
expect(obj[1]).toBe(2);
