function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _nullish = new WeakMap();

var _and = new WeakMap();

var _or = new WeakMap();

class Foo {
  constructor() {
    _nullish.set(this, {
      writable: true,
      value: 0
    });

    _and.set(this, {
      writable: true,
      value: 0
    });

    _or.set(this, {
      writable: true,
      value: 0
    });
  }

  self() {
    return this;
  }

  test() {
    var _this$self;

    _classPrivateFieldGet(this, _nullish) ?? _classPrivateFieldSet(this, _nullish, 42);
    _classPrivateFieldGet(this, _and) && _classPrivateFieldSet(this, _and, 0);
    _classPrivateFieldGet(this, _or) || _classPrivateFieldSet(this, _or, 0);
    _classPrivateFieldGet(_this$self = this.self(), _nullish) ?? _classPrivateFieldSet(_this$self, _nullish, 42);
  }

}
