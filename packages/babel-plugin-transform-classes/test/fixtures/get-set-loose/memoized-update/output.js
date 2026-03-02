"use strict";

let Base = function Base() {};
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
    return _Base.apply(this, arguments) || this;
  }
  babelHelpers.inheritsLoose(Obj, _Base);
  var _proto = Obj.prototype;
  _proto.update = function update() {
    var _proper$prop, _super$proper$prop, _super$proper$prop2;
    this[_proper$prop = proper.prop] = (_super$proper$prop = _Base.prototype[_proper$prop], _super$proper$prop2 = _super$proper$prop++, _super$proper$prop), _super$proper$prop2;
  };
  _proto.update2 = function update2() {
    var _i, _super$i, _super$i2;
    this[_i = i] = (_super$i = _Base.prototype[_i], _super$i2 = _super$i++, _super$i), _super$i2;
  };
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
