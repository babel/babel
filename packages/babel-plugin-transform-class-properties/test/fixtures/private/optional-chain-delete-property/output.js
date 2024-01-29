var _Foo;
class Foo {
  static getSelf() {
    return this;
  }
  static test() {
    var _deep$very$o, _babelHelpers$classSt, _babelHelpers$classSt2, _fnDeep$very$o, _babelHelpers$classSt3, _babelHelpers$classSt4;
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
    Foo === null || Foo === void 0 ? true : delete babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _self).unicorn;
    (_deep$very$o = deep?.very.o) === null || _deep$very$o === void 0 ? true : delete babelHelpers.classStaticPrivateFieldSpecGet(_deep$very$o.Foo, Foo, _self).unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.self?.self.unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : (_babelHelpers$classSt = babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf)?.call(_babelHelpers$classSt).unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf?.().unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf())?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : (_babelHelpers$classSt2 = babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf)?.call(_babelHelpers$classSt2)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf()?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf?.()?.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).unicorn;
    (_fnDeep$very$o = fnDeep?.().very.o) === null || _fnDeep$very$o === void 0 ? true : delete babelHelpers.classStaticPrivateFieldSpecGet(_fnDeep$very$o.Foo, Foo, _self).unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.self?.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_babelHelpers$classSt3 = babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf)?.call(_babelHelpers$classSt3).unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf?.().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf())?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_babelHelpers$classSt4 = babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf)?.call(_babelHelpers$classSt4)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf()?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf?.()?.self.unicorn;
  }
}
_Foo = Foo;
var _x = {
  writable: true,
  value: 1
};
var _self = {
  writable: true,
  value: _Foo
};
babelHelpers.defineProperty(Foo, "self", _Foo);
Foo.test();
