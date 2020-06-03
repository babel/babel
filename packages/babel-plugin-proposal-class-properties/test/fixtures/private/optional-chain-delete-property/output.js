function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _deep$very$o, _classStaticPrivateFi, _classStaticPrivateFi2, _fnDeep$very$o, _classStaticPrivateFi3, _classStaticPrivateFi4;

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

    Foo === null || Foo === void 0 ? true : delete _classStaticPrivateFieldSpecGet(Foo, Foo, _self).unicorn;
    (_deep$very$o = deep?.very.o) === null || _deep$very$o === void 0 ? true : delete _classStaticPrivateFieldSpecGet(_deep$very$o.Foo, Foo, _self).unicorn;
    o === null || o === void 0 ? true : delete _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).unicorn;
    o === null || o === void 0 ? true : delete _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self.unicorn;
    delete (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.self?.self.unicorn;
    o === null || o === void 0 ? true : delete _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : (_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi).unicorn;
    delete (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf?.().unicorn;
    delete (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf())?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : (_classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi2)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf()?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf?.()?.self.unicorn;
    fn === null || fn === void 0 ? true : delete _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).unicorn;
    (_fnDeep$very$o = fnDeep?.().very.o) === null || _fnDeep$very$o === void 0 ? true : delete _classStaticPrivateFieldSpecGet(_fnDeep$very$o.Foo, Foo, _self).unicorn;
    fn === null || fn === void 0 ? true : delete _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).unicorn;
    fn === null || fn === void 0 ? true : delete _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.self?.self.unicorn;
    fn === null || fn === void 0 ? true : delete _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi3 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi3).unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf?.().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf())?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi4 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi4)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf()?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf?.()?.self.unicorn;
  }

}

var _x = {
  writable: true,
  value: 1
};
var _self = {
  writable: true,
  value: Foo
};

_defineProperty(Foo, "self", Foo);

Foo.test();
