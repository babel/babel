function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class A {
  constructor() {
    _x.set(this, {
      writable: true,
      value: void 0
    });
  }

  fn() {
    _classPrivateFieldGet(this, _x)();
  }

}

var _x = new WeakMap();
