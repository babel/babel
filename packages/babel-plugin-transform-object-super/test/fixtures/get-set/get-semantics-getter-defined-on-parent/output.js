"use strict";

var _obj;

function _get(object, property, receiver) { var base = _superPropBase(object, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } else if ("value" in desc) { return desc.value; } }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

const Base = {
  get test() {
    assert.equal(this, obj);
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
assert.equal(obj.test, 2);
assert.equal(obj.get(), 1);
