"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

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

let Obj =
/*#__PURE__*/
function (_Base) {
  function Obj() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Obj.prototype;

  _proto.assign = function assign() {
    var _proper$prop;

    this[_proper$prop = proper.prop] = _Base.prototype[_proper$prop] + 1;
  };

  _proto.assign2 = function assign2() {
    var _i;

    this[_i = i] = _Base.prototype[_i] + 1;
  };

  _inheritsLoose(Obj, _Base);

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
