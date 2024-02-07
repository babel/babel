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
    function f(o, r = (_o$Foo => o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(_o$Foo = o.Foo, Foo, _m)._.call(_o$Foo))()) {
      return r;
    }
    function g(o, r = (() => o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(babelHelpers.assertClassBrand(o.Foo, Foo, _self)._.getSelf(), Foo, _m)._)()?.()) {
      return r;
    }
    function h(fnDeep, r = (_fnDeep$very$o$Foo => (_fnDeep$very$o$Foo = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : babelHelpers.assertClassBrand(_fnDeep$very$o$Foo, Foo, _m)._.call(_fnDeep$very$o$Foo))()) {
      return r;
    }
    function i(fn, r = ((_getSelf, _getSelf$self) => (_getSelf = (() => fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(fn().Foo, Foo, _self)._)()?.getSelf()) === null || _getSelf === void 0 ? void 0 : babelHelpers.assertClassBrand(_getSelf$self = _getSelf.self, Foo, _m)._.call(_getSelf$self))()) {
      return r;
    }
    function j(fn, r = (_babelHelpers$assertC => babelHelpers.assertClassBrand(_babelHelpers$assertC = babelHelpers.assertClassBrand(fn().Foo, Foo, _self)._.getSelf().self, Foo, _m)._?.call(_babelHelpers$assertC))()) {
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
    return babelHelpers.assertClassBrand(this, _Foo, _x)._;
  }
};
var _self = {
  _: _Foo
};
babelHelpers.defineProperty(Foo, "self", _Foo);
Foo.test();
