var _Foo;
var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
var _m = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("m");
class Foo {
  static getSelf() {
    return Foo;
  }
  test() {
    var _o$Foo$self$getSelf, _o$Foo$self$getSelf2, _fn$Foo$self$getSelf, _fn$Foo$self$getSelf2;
    const o = {
      Foo: Foo
    };
    const fn = function () {
      return o;
    };
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(Foo, _m, 1).bind(Foo))();
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(Foo, _m, 1).bind(Foo))().toString;
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(Foo, _m, 1).bind(Foo))().toString();
    (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _m, 1).bind(o.Foo))();
    (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _m, 1).bind(o.Foo))().toString;
    (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(o.Foo, _m, 1).bind(o.Foo))().toString();
    ((_o$Foo$self$getSelf = (o.Foo?.self.getSelf)()) === null || _o$Foo$self$getSelf === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_o$Foo$self$getSelf, _m, 1).bind(_o$Foo$self$getSelf))();
    ((_o$Foo$self$getSelf2 = (o.Foo.self?.getSelf)()) === null || _o$Foo$self$getSelf2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_o$Foo$self$getSelf2, _m, 1).bind(_o$Foo$self$getSelf2))();
    ((_fn$Foo$self$getSelf = (fn()?.Foo?.self.getSelf)()) === null || _fn$Foo$self$getSelf === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_fn$Foo$self$getSelf, _m, 1).bind(_fn$Foo$self$getSelf))();
    ((_fn$Foo$self$getSelf2 = (fn?.().Foo.self?.getSelf)()) === null || _fn$Foo$self$getSelf2 === void 0 ? void 0 : babelHelpers.assertClassBrandLoose(_fn$Foo$self$getSelf2, _m, 1).bind(_fn$Foo$self$getSelf2))();
  }
}
_Foo = Foo;
Object.defineProperty(Foo, _x, {
  writable: true,
  value: 1
});
Foo.self = _Foo;
Object.defineProperty(Foo, _m, {
  writable: true,
  value: function () {
    return babelHelpers.assertClassBrandLoose(this, _x, 1);
  }
});
new Foo().test();
