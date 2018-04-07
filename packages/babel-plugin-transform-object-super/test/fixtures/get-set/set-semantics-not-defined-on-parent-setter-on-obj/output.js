"use strict";

var _obj;

function _set(object, property, value, receiver) { var base = _superPropBase(object, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return value; } else if (desc.get || !desc.writable) { return base[property] = value; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (desc.set) { if (_isStrict()) { throw new Error("cannot redefine property"); } return value; } else { return receiver[property] = value; } } Object.defineProperty(receiver, property, { value: value, writable: true, configurable: true, enumerable: true }); return value; }

function _isStrict() { var strict = false; try { var obj = { get test() {} }; obj.test = 1; } catch (e) { strict = true; } _isStrict = function () { return strict; }; return strict; }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

const Base = {};
let value = 2;
const obj = _obj = {
  set test(v) {
    assert.equal(this, obj);
    value = v;
  },

  set() {
    return _set(_getPrototypeOf(_obj), "test", 3, this);
  }

};
Object.setPrototypeOf(obj, Base);
assert.equal(obj.set(), 3);
assert.equal(Base.test, undefined);
assert.equal(value, 3);
assert.equal(obj.test, undefined);
