function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var _nullish = _classPrivateFieldLooseKey("nullish");

var _and = _classPrivateFieldLooseKey("and");

var _or = _classPrivateFieldLooseKey("or");

class Foo {
  constructor() {
    Object.defineProperty(this, _nullish, {
      writable: true,
      value: 0
    });
    Object.defineProperty(this, _and, {
      writable: true,
      value: 0
    });
    Object.defineProperty(this, _or, {
      writable: true,
      value: 0
    });
  }

  self() {
    return this;
  }

  test() {
    var _classPrivateFieldLoo, _classPrivateFieldLoo2, _classPrivateFieldLoo3, _classPrivateFieldLoo4;

    (_classPrivateFieldLoo = _classPrivateFieldLooseBase(this, _nullish))[_nullish] ?? (_classPrivateFieldLoo[_nullish] = 42);
    (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase(this, _and))[_and] && (_classPrivateFieldLoo2[_and] = 0);
    (_classPrivateFieldLoo3 = _classPrivateFieldLooseBase(this, _or))[_or] || (_classPrivateFieldLoo3[_or] = 0);
    (_classPrivateFieldLoo4 = _classPrivateFieldLooseBase(this.self(), _nullish))[_nullish] ?? (_classPrivateFieldLoo4[_nullish] = 42);
  }

}
