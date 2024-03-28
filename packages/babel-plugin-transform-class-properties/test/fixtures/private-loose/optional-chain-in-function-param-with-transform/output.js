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
    function g(o, r = (_ref => (_ref = (() => o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(babelHelpers.assertClassBrandLoose(o.Foo, _self, 1).getSelf(), _m, 1))()) == null ? void 0 : _ref())()) {
      return r;
    }
    function h(fnDeep, r = ((_fnDeep$very$o$Foo, _fnDeep$very$o) => (_fnDeep$very$o$Foo = fnDeep == null || (_fnDeep$very$o = fnDeep().very.o) == null ? void 0 : _fnDeep$very$o.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : _fnDeep$very$o$Foo[_m]())()) {
      return r;
    }
    function i(fn, r = ((_getSelf, _ref2) => (_getSelf = (_ref2 = (() => fn === null || fn === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1))()) == null ? void 0 : _ref2.getSelf()) === null || _getSelf === void 0 ? void 0 : _getSelf.self[_m]())()) {
      return r;
    }
    function j(fn, r = ((_babelHelpers$assertC, _babelHelpers$assertC2) => (_babelHelpers$assertC = (_babelHelpers$assertC2 = babelHelpers.assertClassBrandLoose(fn().Foo, _self, 1).getSelf().self)[_m]) == null ? void 0 : _babelHelpers$assertC.call(_babelHelpers$assertC2))()) {
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
    return babelHelpers.assertClassBrandLoose(this, _x, 1);
  }
});
Object.defineProperty(Foo, _self, {
  writable: true,
  value: _Foo
});
Foo.self = _Foo;
Foo.test();
