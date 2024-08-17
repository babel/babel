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
    function g(o, r = (() => o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, babelHelpers.assertClassBrand(Foo, o.Foo, _self)._.getSelf(), _m)._)()?.()) {
      return r;
    }
    function h(fnDeep, r = (_fnDeep$very$o$Foo => (_fnDeep$very$o$Foo = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _fnDeep$very$o$Foo, _m)._.call(_fnDeep$very$o$Foo))()) {
      return r;
    }
    function i(fn, r = ((_getSelf, _getSelf$self) => (_getSelf = (() => fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._)()?.getSelf()) === null || _getSelf === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _getSelf$self = _getSelf.self, _m)._.call(_getSelf$self))()) {
      return r;
    }
    function j(fn, r = (_babelHelpers$assertC => babelHelpers.assertClassBrand(Foo, _babelHelpers$assertC = babelHelpers.assertClassBrand(Foo, fn().Foo, _self)._.getSelf().self, _m)._?.call(_babelHelpers$assertC))()) {
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
