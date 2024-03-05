var _Foo;
var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
var _self = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("self");
class Foo {
  static getSelf() {
    return this;
  }
  static test() {
    var _o$Foo, _o$Foo2, _o$Foo3, _deep$very$o$Foo, _deep$very$o$Foo2, _deep$very$o$Foo3, _ref, _ref2, _self2, _self3, _self$self, _ref3, _babelHelpers$assertC, _call, _getSelf, _getSelf2, _self4, _babelHelpers$assertC2, _call$self, _getSelf$self, _getSelf$self2, _fn$Foo, _fn$Foo2, _fn$Foo3, _fnDeep$very$o$Foo, _fnDeep$very$o$Foo2, _fnDeep$very$o$Foo3, _ref4, _ref5, _self5, _self6, _self$self2, _ref6, _babelHelpers$assertC3, _call2, _getSelf3, _getSelf4, _self7, _babelHelpers$assertC4, _call$self2, _getSelf$self3, _getSelf$self4;
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
    Foo === null || Foo === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(Foo, _x, 1);
    Foo === null || Foo === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(Foo, _x, 1).toString;
    Foo === null || Foo === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(Foo, _x, 1).toString();
    (_o$Foo = o?.Foo) === null || _o$Foo === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_o$Foo, _x, 1);
    (_o$Foo2 = o?.Foo) === null || _o$Foo2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_o$Foo2, _x, 1).toString;
    (_o$Foo3 = o?.Foo) === null || _o$Foo3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_o$Foo3, _x, 1).toString();
    (_deep$very$o$Foo = deep?.very.o?.Foo) === null || _deep$very$o$Foo === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_deep$very$o$Foo, _x, 1);
    (_deep$very$o$Foo2 = deep?.very.o?.Foo) === null || _deep$very$o$Foo2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_deep$very$o$Foo2, _x, 1).toString;
    (_deep$very$o$Foo3 = deep?.very.o?.Foo) === null || _deep$very$o$Foo3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_deep$very$o$Foo3, _x, 1).toString();
    (_ref = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1)) === null || _ref === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref, _x, 1);
    (_ref2 = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).self) === null || _ref2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref2, _x, 1);
    (_self2 = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.self) === null || _self2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_self2, _x, 1);
    (_self3 = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).self)?.self) === null || _self3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_self3, _x, 1);
    (_self$self = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.self?.self) === null || _self$self === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_self$self, _x, 1);
    (_ref3 = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).getSelf()) === null || _ref3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref3, _x, 1);
    (_call = (o === null || o === void 0 ? void 0 : (_babelHelpers$assertC = babelHelpers.assertClassBrandLoose(o.Foo, _self, 1)).getSelf)?.call(_babelHelpers$assertC)) === null || _call === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_call, _x, 1);
    (_getSelf = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.getSelf()) === null || _getSelf === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf, _x, 1);
    (_getSelf2 = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.getSelf?.()) === null || _getSelf2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf2, _x, 1);
    (_self4 = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).getSelf())?.self) === null || _self4 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_self4, _x, 1);
    (_call$self = (o === null || o === void 0 ? void 0 : (_babelHelpers$assertC2 = babelHelpers.assertClassBrandLoose(o.Foo, _self, 1)).getSelf)?.call(_babelHelpers$assertC2)?.self) === null || _call$self === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_call$self, _x, 1);
    (_getSelf$self = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.getSelf()?.self) === null || _getSelf$self === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf$self, _x, 1);
    (_getSelf$self2 = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.getSelf?.()?.self) === null || _getSelf$self2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf$self2, _x, 1);
    (_fn$Foo = fn?.().Foo) === null || _fn$Foo === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_fn$Foo, _x, 1);
    (_fn$Foo2 = fn?.().Foo) === null || _fn$Foo2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_fn$Foo2, _x, 1).toString;
    (_fn$Foo3 = fn?.().Foo) === null || _fn$Foo3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_fn$Foo3, _x, 1).toString();
    (_fnDeep$very$o$Foo = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_fnDeep$very$o$Foo, _x, 1);
    (_fnDeep$very$o$Foo2 = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_fnDeep$very$o$Foo2, _x, 1).toString;
    (_fnDeep$very$o$Foo3 = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_fnDeep$very$o$Foo3, _x, 1).toString();
    (_ref4 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1)) === null || _ref4 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref4, _x, 1);
    (_ref5 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).self) === null || _ref5 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref5, _x, 1);
    (_self5 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.self) === null || _self5 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_self5, _x, 1);
    (_self6 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).self)?.self) === null || _self6 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_self6, _x, 1);
    (_self$self2 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.self?.self) === null || _self$self2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_self$self2, _x, 1);
    (_ref6 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).getSelf()) === null || _ref6 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref6, _x, 1);
    (_call2 = (fn === null || fn === void 0 ? void 0 : (_babelHelpers$assertC3 = babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1)).getSelf)?.call(_babelHelpers$assertC3)) === null || _call2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_call2, _x, 1);
    (_getSelf3 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.getSelf()) === null || _getSelf3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf3, _x, 1);
    (_getSelf4 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.getSelf?.()) === null || _getSelf4 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf4, _x, 1);
    (_self7 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).getSelf())?.self) === null || _self7 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_self7, _x, 1);
    (_call$self2 = (fn === null || fn === void 0 ? void 0 : (_babelHelpers$assertC4 = babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1)).getSelf)?.call(_babelHelpers$assertC4)?.self) === null || _call$self2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_call$self2, _x, 1);
    (_getSelf$self3 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.getSelf()?.self) === null || _getSelf$self3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf$self3, _x, 1);
    (_getSelf$self4 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.getSelf?.()?.self) === null || _getSelf$self4 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf$self4, _x, 1);
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
