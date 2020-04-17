function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const sym = Symbol();
const sym1 = Symbol();

class A {
  constructor() {
    _defineProperty(this, sym, void 0);

    _defineProperty(this, sym1, void 0);
  }

}
