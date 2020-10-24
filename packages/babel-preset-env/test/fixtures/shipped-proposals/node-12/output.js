function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _y = new WeakSet();

class A {
  constructor() {
    _y.add(this);

    _defineProperty(this, "x", void 0);
  }

}

var _y2 = function _y2() {};
