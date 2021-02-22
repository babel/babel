function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _p = new WeakMap();

class C {
  constructor() {
    _p.set(this, {
      writable: true,
      value: 1
    });

    _defineProperty(this, "q", _classPrivateFieldGet(this, _p));
  }

}
