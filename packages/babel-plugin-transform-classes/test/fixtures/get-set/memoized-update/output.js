"use strict";

let Base = function Base() {
  babelHelpers.classCallCheck(this, Base);
};

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

  var _super = babelHelpers.createSuper(Obj);

  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Obj, [{
    key: "update",
    value: function update() {
      var _proper$prop, _super$proper$prop;

      babelHelpers.set(babelHelpers.getPrototypeOf(Obj.prototype), _proper$prop = proper.prop, (_super$proper$prop = +babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), _proper$prop, this)) + 1, this, true), _super$proper$prop;
    }
  }, {
    key: "update2",
    value: function update2() {
      var _i, _super$i;

      babelHelpers.set(babelHelpers.getPrototypeOf(Obj.prototype), _i = i, (_super$i = +babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), _i, this)) + 1, this, true), _super$i;
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
