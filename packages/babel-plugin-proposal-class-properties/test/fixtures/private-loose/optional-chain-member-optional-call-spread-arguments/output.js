function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var _m = _classPrivateFieldLooseKey("m");

class Foo {
  constructor() {
    Object.defineProperty(this, _m, {
      writable: true,
      value: void 0
    });
  }

  init() {
    _classPrivateFieldLooseBase(this, _m)[_m] = (...args) => args;
  }

  static test() {
    const f = new Foo();
    f.init();
    return _classPrivateFieldLooseBase(f, _m)[_m]?.(...arguments);
  }

  static testNull() {
    const f = new Foo();
    return _classPrivateFieldLooseBase(f, _m)[_m]?.(...arguments);
  }

}
