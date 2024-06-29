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
    key: "update",
    value: function update() {
      var _proper$prop, _super$proper$prop, _super$proper$prop2;
      babelHelpers.superPropSet(Obj, _proper$prop = proper.prop, (_super$proper$prop = babelHelpers.superPropGet(Obj, _proper$prop, this, 1), _super$proper$prop2 = _super$proper$prop++, _super$proper$prop), this, 1, 1), _super$proper$prop2;
    }
  }, {
    key: "update2",
    value: function update2() {
      var _i, _super$i, _super$i2;
      babelHelpers.superPropSet(Obj, _i = i, (_super$i = babelHelpers.superPropGet(Obj, _i, this, 1), _super$i2 = _super$i++, _super$i), this, 1, 1), _super$i2;
    }
  }]);
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
