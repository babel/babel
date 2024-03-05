var _Foo;
var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
var _self = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("self");
class Foo {
  static getSelf() {
    return this;
  }
  static test() {
    var _deep$very$o, _deep$very$o2, _deep$very$o3, _ref, _ref2, _self2, _babelHelpers$assertC, _ref3, _ref4, _getSelf, _ref5, _ref6, _babelHelpers$assertC2, _call, _getSelf2, _getSelf3, _fnDeep$very$o, _fnDeep$very$o2, _fnDeep$very$o3, _ref7, _ref8, _self3, _babelHelpers$assertC3, _ref9, _ref10, _getSelf4, _ref11, _ref12, _babelHelpers$assertC4, _call2, _getSelf5, _getSelf6;
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
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _x, 1);
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _x, 1).toString;
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _x, 1).toString();
    (_deep$very$o = deep?.very.o) === null || _deep$very$o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_deep$very$o.Foo, _x, 1);
    (_deep$very$o2 = deep?.very.o) === null || _deep$very$o2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_deep$very$o2.Foo, _x, 1).toString;
    (_deep$very$o3 = deep?.very.o) === null || _deep$very$o3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_deep$very$o3.Foo, _x, 1).toString();
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(babelHelpers.assertClassBrandLoose(o.Foo, _self, 1), _x, 1);
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).self, _x, 1);
    (_ref = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1)) === null || _ref === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref.self, _x, 1);
    (_ref2 = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).self) === null || _ref2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref2.self, _x, 1);
    (_self2 = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.self) === null || _self2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_self2.self, _x, 1);
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).getSelf(), _x, 1);
    (_ref3 = o === null || o === void 0 ? void 0 : (_babelHelpers$assertC = babelHelpers.assertClassBrandLoose(o.Foo, _self, 1)).getSelf) === null || _ref3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref3.call(_babelHelpers$assertC), _x, 1);
    (_ref4 = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1)) === null || _ref4 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref4.getSelf(), _x, 1);
    (_getSelf = (_ref5 = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.getSelf) === null || _getSelf === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf.call(_ref5), _x, 1);
    (_ref6 = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).getSelf()) === null || _ref6 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref6.self, _x, 1);
    (_call = (o === null || o === void 0 ? void 0 : (_babelHelpers$assertC2 = babelHelpers.assertClassBrandLoose(o.Foo, _self, 1)).getSelf)?.call(_babelHelpers$assertC2)) === null || _call === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_call.self, _x, 1);
    (_getSelf2 = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.getSelf()) === null || _getSelf2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf2.self, _x, 1);
    (_getSelf3 = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _self, 1))?.getSelf?.()) === null || _getSelf3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf3.self, _x, 1);
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _x, 1);
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _x, 1).toString;
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _x, 1).toString();
    (_fnDeep$very$o = fnDeep?.().very.o) === null || _fnDeep$very$o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_fnDeep$very$o.Foo, _x, 1);
    (_fnDeep$very$o2 = fnDeep?.().very.o) === null || _fnDeep$very$o2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_fnDeep$very$o2.Foo, _x, 1).toString;
    (_fnDeep$very$o3 = fnDeep?.().very.o) === null || _fnDeep$very$o3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_fnDeep$very$o3.Foo, _x, 1).toString();
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1), _x, 1);
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).self, _x, 1);
    (_ref7 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1)) === null || _ref7 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref7.self, _x, 1);
    (_ref8 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).self) === null || _ref8 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref8.self, _x, 1);
    (_self3 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.self) === null || _self3 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_self3.self, _x, 1);
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).getSelf(), _x, 1);
    (_ref9 = fn === null || fn === void 0 ? void 0 : (_babelHelpers$assertC3 = babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1)).getSelf) === null || _ref9 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref9.call(_babelHelpers$assertC3), _x, 1);
    (_ref10 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1)) === null || _ref10 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref10.getSelf(), _x, 1);
    (_getSelf4 = (_ref11 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.getSelf) === null || _getSelf4 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf4.call(_ref11), _x, 1);
    (_ref12 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).getSelf()) === null || _ref12 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_ref12.self, _x, 1);
    (_call2 = (fn === null || fn === void 0 ? void 0 : (_babelHelpers$assertC4 = babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1)).getSelf)?.call(_babelHelpers$assertC4)) === null || _call2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_call2.self, _x, 1);
    (_getSelf5 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.getSelf()) === null || _getSelf5 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf5.self, _x, 1);
    (_getSelf6 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))?.getSelf?.()) === null || _getSelf6 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_getSelf6.self, _x, 1);
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
