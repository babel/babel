var _Foo;
var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
var _self = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("self");
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
    Foo === null || Foo === void 0 ? true : delete babelHelpers.assertClassBrandLoose(Foo, _self, 1).unicorn;
    (_deep$very$o = deep?.very.o) === null || _deep$very$o === void 0 ? true : delete babelHelpers.assertClassBrandLoose(_deep$very$o.Foo, _self, 1).unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).self)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.self?.self.unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : (_babelHelpers$assertC = babelHelpers.assertClassBrandLoose(o.Foo, _self, 1)).getSelf)?.call(_babelHelpers$assertC).unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.getSelf?.().unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).getSelf())?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : (_babelHelpers$assertC2 = babelHelpers.assertClassBrandLoose(o.Foo, _self, 1)).getSelf)?.call(_babelHelpers$assertC2)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.getSelf()?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.getSelf?.()?.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).unicorn;
    (_fnDeep$very$o = fnDeep?.().very.o) === null || _fnDeep$very$o === void 0 ? true : delete babelHelpers.assertClassBrandLoose(_fnDeep$very$o.Foo, _self, 1).unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).self)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.self?.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_babelHelpers$assertC3 = babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1)).getSelf)?.call(_babelHelpers$assertC3).unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.getSelf?.().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).getSelf())?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_babelHelpers$assertC4 = babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1)).getSelf)?.call(_babelHelpers$assertC4)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.getSelf()?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.getSelf?.()?.self.unicorn;
  }
}
_Foo = Foo;
Object.defineProperty(Foo, _x, {
  writable: true,
  value: 1
});
Object.defineProperty(Foo, _self, {
  writable: true,
  value: _Foo
});
Foo.self = _Foo;
Foo.test();
