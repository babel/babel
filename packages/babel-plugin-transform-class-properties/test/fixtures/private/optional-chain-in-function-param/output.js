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
    function f(o, r = (_o$Foo => o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$Foo = o.Foo, Foo, _m).call(_o$Foo))()) {
      return r;
    }
    function g(o, r = (() => o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf(), Foo, _m))()?.()) {
      return r;
    }
    function h(fnDeep, r = (_fnDeep$very$o$Foo => (_fnDeep$very$o$Foo = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo, Foo, _m).call(_fnDeep$very$o$Foo))()) {
      return r;
    }
    function i(fn, r = ((_getSelf, _getSelf$self) => (_getSelf = (() => fn === null || fn === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))()?.getSelf()) === null || _getSelf === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_getSelf$self = _getSelf.self, Foo, _m).call(_getSelf$self))()) {
      return r;
    }
    function j(fn, r = (_babelHelpers$classSt => babelHelpers.classStaticPrivateFieldSpecGet(_babelHelpers$classSt = babelHelpers.classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf().self, Foo, _m)?.call(_babelHelpers$classSt))()) {
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
  writable: true,
  value: 1
};
var _m = {
  writable: true,
  value: function () {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, _Foo, _x);
  }
};
var _self = {
  writable: true,
  value: _Foo
};
babelHelpers.defineProperty(Foo, "self", _Foo);
Foo.test();
