function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var _x = _classPrivateFieldLooseKey("x");

var _self = _classPrivateFieldLooseKey("self");

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _deep$very$o, _classPrivateFieldLoo, _classPrivateFieldLoo2, _fnDeep$very$o, _classPrivateFieldLoo3, _classPrivateFieldLoo4;

    const o = {
      Foo: Foo
    };
    const deep = {
      very: {
        o
      }
    };

    function fn() {
      return o;
    }

    function fnDeep() {
      return deep;
    }

    Foo === null || Foo === void 0 ? true : delete _classPrivateFieldLooseBase(Foo, _self)[_self].unicorn;
    (_deep$very$o = deep?.very.o) === null || _deep$very$o === void 0 ? true : delete _classPrivateFieldLooseBase(_deep$very$o.Foo, _self)[_self].unicorn;
    o === null || o === void 0 ? true : delete _classPrivateFieldLooseBase(o.Foo, _self)[_self].unicorn;
    o === null || o === void 0 ? true : delete _classPrivateFieldLooseBase(o.Foo, _self)[_self].self.unicorn;
    delete (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].self)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.self?.self.unicorn;
    o === null || o === void 0 ? true : delete _classPrivateFieldLooseBase(o.Foo, _self)[_self].getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : (_classPrivateFieldLoo = _classPrivateFieldLooseBase(o.Foo, _self)[_self]).getSelf)?.call(_classPrivateFieldLoo).unicorn;
    delete (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.getSelf?.().unicorn;
    delete (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].getSelf())?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase(o.Foo, _self)[_self]).getSelf)?.call(_classPrivateFieldLoo2)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.getSelf()?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self])?.getSelf?.()?.self.unicorn;
    fn === null || fn === void 0 ? true : delete _classPrivateFieldLooseBase(fn().Foo, _self)[_self].unicorn;
    (_fnDeep$very$o = fnDeep?.().very.o) === null || _fnDeep$very$o === void 0 ? true : delete _classPrivateFieldLooseBase(_fnDeep$very$o.Foo, _self)[_self].unicorn;
    fn === null || fn === void 0 ? true : delete _classPrivateFieldLooseBase(fn().Foo, _self)[_self].unicorn;
    fn === null || fn === void 0 ? true : delete _classPrivateFieldLooseBase(fn().Foo, _self)[_self].self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].self)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.self?.self.unicorn;
    fn === null || fn === void 0 ? true : delete _classPrivateFieldLooseBase(fn().Foo, _self)[_self].getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_classPrivateFieldLoo3 = _classPrivateFieldLooseBase(fn().Foo, _self)[_self]).getSelf)?.call(_classPrivateFieldLoo3).unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.getSelf?.().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].getSelf())?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_classPrivateFieldLoo4 = _classPrivateFieldLooseBase(fn().Foo, _self)[_self]).getSelf)?.call(_classPrivateFieldLoo4)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.getSelf()?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])?.getSelf?.()?.self.unicorn;
  }

}

Object.defineProperty(Foo, _x, {
  writable: true,
  value: 1
});
Object.defineProperty(Foo, _self, {
  writable: true,
  value: Foo
});
Foo.self = Foo;
Foo.test();
