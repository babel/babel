var _x = babelHelpers.temporalUndefined,
    _self = babelHelpers.temporalUndefined;

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _deep$very$o, _babelHelpers$classCh, _babelHelpers$classCh2, _fnDeep$very$o, _babelHelpers$classCh3, _babelHelpers$classCh4;

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

    Foo === null || Foo === void 0 ? true : delete babelHelpers.classCheckPrivateStaticAccess(Foo, Foo, _self).unicorn;
    (_deep$very$o = deep?.very.o) === null || _deep$very$o === void 0 ? true : delete babelHelpers.classCheckPrivateStaticAccess(_deep$very$o.Foo, Foo, _self).unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self))?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).self)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self))?.self?.self.unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : (_babelHelpers$classCh = babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self)).getSelf)?.call(_babelHelpers$classCh).unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self))?.getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self))?.getSelf?.().unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).getSelf())?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : (_babelHelpers$classCh2 = babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self)).getSelf)?.call(_babelHelpers$classCh2)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self))?.getSelf()?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self))?.getSelf?.()?.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).unicorn;
    (_fnDeep$very$o = fnDeep?.().very.o) === null || _fnDeep$very$o === void 0 ? true : delete babelHelpers.classCheckPrivateStaticAccess(_fnDeep$very$o.Foo, Foo, _self).unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self))?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).self)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self))?.self?.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_babelHelpers$classCh3 = babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self)).getSelf)?.call(_babelHelpers$classCh3).unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self))?.getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self))?.getSelf?.().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).getSelf())?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_babelHelpers$classCh4 = babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self)).getSelf)?.call(_babelHelpers$classCh4)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self))?.getSelf()?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self))?.getSelf?.()?.self.unicorn;
  }

}

_x = 1;
_self = Foo;
babelHelpers.defineProperty(Foo, "self", Foo);
Foo.test();
