"use strict";

var _obj;

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { if (Object.setPrototypeOf && Object.getPrototypeOf) { _getPrototypeOf = Object.getPrototypeOf; } else { _getPrototypeOf = function _getPrototypeOf(o) { return o.__proto__; }; } return _getPrototypeOf(o); }

const Base = {
  get test() {
    expect(this).toBe(obj);
    return 1;
  }

};
const obj = _obj = {
  test: 2,

  get() {
    return _get(_getPrototypeOf(_obj), "test", this);
  }

};
Object.setPrototypeOf(obj, Base);
expect(obj.test).toBe(2);
expect(obj.get()).toBe(1);
