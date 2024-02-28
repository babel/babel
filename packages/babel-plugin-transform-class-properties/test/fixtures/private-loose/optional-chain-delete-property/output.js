var _Foo;
var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
var _self = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("self");
class Foo {
  static getSelf() {
    return this;
  }
  static test() {
    var _deep$very$o, _babelHelpers$classPr, _babelHelpers$classPr2, _fnDeep$very$o, _babelHelpers$classPr3, _babelHelpers$classPr4;
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
    Foo === null || Foo === void 0 ? true : delete babelHelpers.classPrivateFieldLoose(Foo, _self).unicorn;
    (_deep$very$o = deep?.very.o) === null || _deep$very$o === void 0 ? true : delete babelHelpers.classPrivateFieldLoose(_deep$very$o.Foo, _self).unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classPrivateFieldLoose(o.Foo, _self).unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classPrivateFieldLoose(o.Foo, _self).self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(o.Foo, _self))?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(o.Foo, _self).self)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(o.Foo, _self))?.self?.self.unicorn;
    o === null || o === void 0 ? true : delete babelHelpers.classPrivateFieldLoose(o.Foo, _self).getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : (_babelHelpers$classPr = babelHelpers.classPrivateFieldLoose(o.Foo, _self)).getSelf)?.call(_babelHelpers$classPr).unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(o.Foo, _self))?.getSelf().unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(o.Foo, _self))?.getSelf?.().unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(o.Foo, _self).getSelf())?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : (_babelHelpers$classPr2 = babelHelpers.classPrivateFieldLoose(o.Foo, _self)).getSelf)?.call(_babelHelpers$classPr2)?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(o.Foo, _self))?.getSelf()?.self.unicorn;
    delete (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(o.Foo, _self))?.getSelf?.()?.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classPrivateFieldLoose(fn().Foo, _self).unicorn;
    (_fnDeep$very$o = fnDeep?.().very.o) === null || _fnDeep$very$o === void 0 ? true : delete babelHelpers.classPrivateFieldLoose(_fnDeep$very$o.Foo, _self).unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classPrivateFieldLoose(fn().Foo, _self).unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classPrivateFieldLoose(fn().Foo, _self).self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(fn().Foo, _self))?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(fn().Foo, _self).self)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(fn().Foo, _self))?.self?.self.unicorn;
    fn === null || fn === void 0 ? true : delete babelHelpers.classPrivateFieldLoose(fn().Foo, _self).getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_babelHelpers$classPr3 = babelHelpers.classPrivateFieldLoose(fn().Foo, _self)).getSelf)?.call(_babelHelpers$classPr3).unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(fn().Foo, _self))?.getSelf().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(fn().Foo, _self))?.getSelf?.().unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(fn().Foo, _self).getSelf())?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : (_babelHelpers$classPr4 = babelHelpers.classPrivateFieldLoose(fn().Foo, _self)).getSelf)?.call(_babelHelpers$classPr4)?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(fn().Foo, _self))?.getSelf()?.self.unicorn;
    delete (fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(fn().Foo, _self))?.getSelf?.()?.self.unicorn;
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
