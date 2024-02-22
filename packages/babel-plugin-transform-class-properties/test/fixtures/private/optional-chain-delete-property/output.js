var _Foo;
class Foo {
  static getSelf() {
    return this;
  }
  static test() {
    var _deep$very$o, _babelHelpers$assertC, _babelHelpers$assertC2, _fnDeep$very$o, _babelHelpers$assertC3, _babelHelpers$assertC4;
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
    Foo === null || Foo === void 0 ? true : delete _self._.unicorn;
    (_deep$very$o = deep?.very.o) === null || _deep$very$o === void 0 ? true : delete babelHelpers.assertClassBrand(Foo, _deep$very$o.Foo, _self)._.unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.assertClassBrand(Foo, o.Foo, _self)._.unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.assertClassBrand(Foo, o.Foo, _self)._.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._.self)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._)?.self?.self.unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.assertClassBrand(Foo, o.Foo, _self)._.getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : (_babelHelpers$assertC = babelHelpers.assertClassBrand(Foo, o.Foo, _self)._).getSelf)?.call(_babelHelpers$assertC).unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._)?.getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._)?.getSelf?.().unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._.getSelf())?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : (_babelHelpers$assertC2 = babelHelpers.assertClassBrand(Foo, o.Foo, _self)._).getSelf)?.call(_babelHelpers$assertC2)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._)?.getSelf()?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._)?.getSelf?.()?.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.unicorn;
    (_fnDeep$very$o = fnDeep?.().very.o) === null || _fnDeep$very$o === void 0 ? true : delete babelHelpers.assertClassBrand(Foo, _fnDeep$very$o.Foo, _self)._.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.self)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)?.self?.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_babelHelpers$assertC3 = babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._).getSelf)?.call(_babelHelpers$assertC3).unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)?.getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)?.getSelf?.().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.getSelf())?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_babelHelpers$assertC4 = babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._).getSelf)?.call(_babelHelpers$assertC4)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)?.getSelf()?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)?.getSelf?.()?.self.unicorn;
  }
}
_Foo = Foo;
var _x = {
  _: 1
};
var _self = {
  _: _Foo
};
babelHelpers.defineProperty(Foo, "self", _Foo);
Foo.test();
