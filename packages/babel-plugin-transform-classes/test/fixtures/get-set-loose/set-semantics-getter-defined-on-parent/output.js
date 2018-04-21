"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let called = false;

let Base =
/*#__PURE__*/
function () {
  function Base() {}

  _createClass(Base, [{
    key: "test",
    get: function () {
      called = true;
      return 1;
    }
  }]);

  return Base;
}();

;

let Obj =
/*#__PURE__*/
function (_Base) {
  function Obj() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Obj.prototype;

  _proto.set = function set() {
    return this.test = 3;
  };

  _inheritsLoose(Obj, _Base);

  return Obj;
}(Base);

Object.defineProperty(Obj.prototype, 'test', {
  value: 2,
  writable: true,
  configurable: true
});
const obj = new Obj(); // This is incorrect according to the spec,
// but close enough for loose.
// expect(() => {

expect(obj.set()).toBe(3); // }).toThrow();

expect(called).toBe(false);
expect(Base.prototype.test).toBe(1);
expect(Obj.prototype.test).toBe(2);
expect(obj.test).toBe(3);
