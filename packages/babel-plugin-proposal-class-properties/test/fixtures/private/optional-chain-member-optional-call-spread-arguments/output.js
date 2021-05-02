function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _m = new WeakMap();

class Foo {
  constructor() {
    _m.set(this, {
      writable: true,
      value: void 0
    });
  }

  init() {
    _classPrivateFieldSet(this, _m, (...args) => args);
  }

  static test() {
    const f = new Foo();
    f.init();
    return _classPrivateFieldGet(f, _m)?.apply(f, arguments);
  }

  static testNull() {
    const f = new Foo();
    return _classPrivateFieldGet(f, _m)?.apply(f, arguments);
  }

}
