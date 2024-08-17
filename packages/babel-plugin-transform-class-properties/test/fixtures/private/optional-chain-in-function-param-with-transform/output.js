var _Foo;
class Foo {
  static getSelf() {
    return this;
  }
  static test() {
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
    function f(o, r = (_o$Foo => o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _o$Foo = o.Foo, _m)._.call(_o$Foo))()) {
      return r;
    }
    function g(o, r = (_ref => (_ref = (() => o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, babelHelpers.assertClassBrand(Foo, o.Foo, _self)._.getSelf(), _m)._)()) === null || _ref === void 0 ? void 0 : _ref())()) {
      return r;
    }
    function h(fnDeep, r = ((_fnDeep$very$o$Foo, _fnDeep$very$o) => (_fnDeep$very$o$Foo = fnDeep === null || fnDeep === void 0 || (_fnDeep$very$o = fnDeep().very.o) === null || _fnDeep$very$o === void 0 ? void 0 : _fnDeep$very$o.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _fnDeep$very$o$Foo, _m)._.call(_fnDeep$very$o$Foo))()) {
      return r;
    }
    function i(fn, r = ((_getSelf, _getSelf$self, _ref2) => (_getSelf = (_ref2 = (() => fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)()) === null || _ref2 === void 0 ? void 0 : _ref2.getSelf()) === null || _getSelf === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _getSelf$self = _getSelf.self, _m)._.call(_getSelf$self))()) {
      return r;
    }
    function j(fn, r = ((_babelHelpers$assertC, _babelHelpers$assertC2) => (_babelHelpers$assertC2 = babelHelpers.assertClassBrand(Foo, _babelHelpers$assertC = babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.getSelf().self, _m)._) === null || _babelHelpers$assertC2 === void 0 ? void 0 : _babelHelpers$assertC2.call(_babelHelpers$assertC))()) {
      return r;
    }
    f(o);
    g(o);
    h(fnDeep);
    i(fn);
    j(fn);
  }
}
_Foo = Foo;
var _x = {
  _: 1
};
var _m = {
  _: function () {
    return babelHelpers.assertClassBrand(_Foo, this, _x)._;
  }
};
var _self = {
  _: _Foo
};
babelHelpers.defineProperty(Foo, "self", _Foo);
Foo.test();
