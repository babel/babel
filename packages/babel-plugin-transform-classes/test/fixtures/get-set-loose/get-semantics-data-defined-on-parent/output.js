"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

let Base = function Base() {};

Base.prototype.test = 1;

let Obj = /*#__PURE__*/function (_Base) {
  _inheritsLoose(Obj, _Base);

  function Obj() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Obj.prototype;

  _proto.get = function get() {
    return _Base.prototype.test;
  };

  return Obj;
}(Base);

Obj.prototype.test = 2;
const obj = new Obj();
expect(obj.test).toBe(2);
expect(obj.get()).toBe(1);
