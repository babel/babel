var _Foo;
var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
var _m = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("m");
var _self = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("self");
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
    function f(o, r = (() => o === null || o === void 0 ? void 0 : o.Foo[_m]())()) {
      return r;
    }
    function g(o, r = (() => o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(babelHelpers.classPrivateFieldGetLoose(o.Foo, _self).getSelf(), _m))()?.()) {
      return r;
    }
    function h(fnDeep, r = (_fnDeep$very$o$Foo => (_fnDeep$very$o$Foo = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : _fnDeep$very$o$Foo[_m]())()) {
      return r;
    }
    function i(fn, r = (_getSelf => (_getSelf = (() => fn === null || fn === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(fn().Foo, _self))()?.getSelf()) === null || _getSelf === void 0 ? void 0 : _getSelf.self[_m]())()) {
      return r;
    }
    function j(fn, r = (() => babelHelpers.classPrivateFieldGetLoose(fn().Foo, _self).getSelf().self[_m]?.())()) {
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
Object.defineProperty(Foo, _x, {
  writable: true,
  value: 1
});
Object.defineProperty(Foo, _m, {
  writable: true,
  value: function () {
    return babelHelpers.classPrivateFieldGetLoose(this, _x);
  }
});
Object.defineProperty(Foo, _self, {
  writable: true,
  value: _Foo
});
Foo.self = _Foo;
Foo.test();
