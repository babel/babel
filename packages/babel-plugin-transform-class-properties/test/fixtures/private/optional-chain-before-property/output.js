var _Foo;
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
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _x)._;
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _x)._.toString;
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _x)._.toString();
    (_deep$very$o = deep?.very.o) === null || _deep$very$o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _deep$very$o.Foo, _x)._;
    (_deep$very$o2 = deep?.very.o) === null || _deep$very$o2 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _deep$very$o2.Foo, _x)._.toString;
    (_deep$very$o3 = deep?.very.o) === null || _deep$very$o3 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _deep$very$o3.Foo, _x)._.toString();
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, babelHelpers.assertClassBrand(Foo, o.Foo, _self)._, _x)._;
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, babelHelpers.assertClassBrand(Foo, o.Foo, _self)._.self, _x)._;
    (_ref = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._) === null || _ref === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _ref.self, _x)._;
    (_ref2 = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._.self) === null || _ref2 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _ref2.self, _x)._;
    (_self2 = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._)?.self) === null || _self2 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _self2.self, _x)._;
    o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, babelHelpers.assertClassBrand(Foo, o.Foo, _self)._.getSelf(), _x)._;
    (_ref3 = o === null || o === void 0 ? void 0 : (_babelHelpers$assertC = babelHelpers.assertClassBrand(Foo, o.Foo, _self)._).getSelf) === null || _ref3 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _ref3.call(_babelHelpers$assertC), _x)._;
    (_ref4 = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._) === null || _ref4 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _ref4.getSelf(), _x)._;
    (_getSelf = (_ref5 = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._)?.getSelf) === null || _getSelf === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _getSelf.call(_ref5), _x)._;
    (_ref6 = o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._.getSelf()) === null || _ref6 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _ref6.self, _x)._;
    (_call = (o === null || o === void 0 ? void 0 : (_babelHelpers$assertC2 = babelHelpers.assertClassBrand(Foo, o.Foo, _self)._).getSelf)?.call(_babelHelpers$assertC2)) === null || _call === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _call.self, _x)._;
    (_getSelf2 = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._)?.getSelf()) === null || _getSelf2 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _getSelf2.self, _x)._;
    (_getSelf3 = (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, o.Foo, _self)._)?.getSelf?.()) === null || _getSelf3 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _getSelf3.self, _x)._;
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _x)._;
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _x)._.toString;
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _x)._.toString();
    (_fnDeep$very$o = fnDeep?.().very.o) === null || _fnDeep$very$o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _fnDeep$very$o.Foo, _x)._;
    (_fnDeep$very$o2 = fnDeep?.().very.o) === null || _fnDeep$very$o2 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _fnDeep$very$o2.Foo, _x)._.toString;
    (_fnDeep$very$o3 = fnDeep?.().very.o) === null || _fnDeep$very$o3 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _fnDeep$very$o3.Foo, _x)._.toString();
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._, _x)._;
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.self, _x)._;
    (_ref7 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._) === null || _ref7 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _ref7.self, _x)._;
    (_ref8 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.self) === null || _ref8 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _ref8.self, _x)._;
    (_self3 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)?.self) === null || _self3 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _self3.self, _x)._;
    fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.getSelf(), _x)._;
    (_ref9 = fn === null || fn === void 0 ? void 0 : (_babelHelpers$assertC3 = babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._).getSelf) === null || _ref9 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _ref9.call(_babelHelpers$assertC3), _x)._;
    (_ref10 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._) === null || _ref10 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _ref10.getSelf(), _x)._;
    (_getSelf4 = (_ref11 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)?.getSelf) === null || _getSelf4 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _getSelf4.call(_ref11), _x)._;
    (_ref12 = fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.getSelf()) === null || _ref12 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _ref12.self, _x)._;
    (_call2 = (fn === null || fn === void 0 ? void 0 : (_babelHelpers$assertC4 = babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._).getSelf)?.call(_babelHelpers$assertC4)) === null || _call2 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _call2.self, _x)._;
    (_getSelf5 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)?.getSelf()) === null || _getSelf5 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _getSelf5.self, _x)._;
    (_getSelf6 = (fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)?.getSelf?.()) === null || _getSelf6 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _getSelf6.self, _x)._;
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
