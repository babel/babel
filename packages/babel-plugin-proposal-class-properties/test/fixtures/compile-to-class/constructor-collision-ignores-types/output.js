function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class C {
  // Output should not use `_initialiseProps`
  constructor(T) {
    _defineProperty(_defineProperty(this, "x", void 0), "y", 0);
  }

}
