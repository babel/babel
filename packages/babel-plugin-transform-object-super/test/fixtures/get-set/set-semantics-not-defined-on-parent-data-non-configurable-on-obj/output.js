"use strict";

var _obj;

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver) { const s = set(target, property, value, receiver || target); if (!s && _isStrict()) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _isStrict() { var strict = false; try { var obj = { get test() {} }; obj.test = 1; } catch (e) { strict = true; } _isStrict = function () { return strict; }; return strict; }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

const Base = {};
const obj = _obj = {
  set() {
    return _set(_getPrototypeOf(_obj), "test", 3, this);
  }

};
Object.defineProperty(obj, 'test', {
  value: 2,
  writable: true,
  configurable: false,
  enumerable: true
});
Object.setPrototypeOf(obj, Base);
assert.equal(obj.set(), 3);
assert.equal(Base.test, undefined);
assert.equal(obj.test, 3);
const desc = Object.getOwnPropertyDescriptor(obj, 'test');
assert.equal(desc.configurable, false);
assert.equal(desc.writable, true);
assert.equal(desc.enumerable, true);
