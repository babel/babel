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
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(Foo, _m).bind(Foo))();
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(Foo, _m).bind(Foo))().toString;
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(Foo, _m).bind(Foo))().toString();
    (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(o.Foo, _m).bind(o.Foo))();
    (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(o.Foo, _m).bind(o.Foo))().toString;
    (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(o.Foo, _m).bind(o.Foo))().toString();
    ((_o$Foo$self$getSelf = (o.Foo?.self.getSelf)()) === null || _o$Foo$self$getSelf === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(_o$Foo$self$getSelf, _m).bind(_o$Foo$self$getSelf))();
    ((_o$Foo$self$getSelf2 = (o.Foo.self?.getSelf)()) === null || _o$Foo$self$getSelf2 === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(_o$Foo$self$getSelf2, _m).bind(_o$Foo$self$getSelf2))();
    ((_fn$Foo$self$getSelf = (fn()?.Foo?.self.getSelf)()) === null || _fn$Foo$self$getSelf === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(_fn$Foo$self$getSelf, _m).bind(_fn$Foo$self$getSelf))();
    ((_fn$Foo$self$getSelf2 = (fn?.().Foo.self?.getSelf)()) === null || _fn$Foo$self$getSelf2 === void 0 ? void 0 : babelHelpers.classPrivateFieldGetLoose(_fn$Foo$self$getSelf2, _m).bind(_fn$Foo$self$getSelf2))();
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
    return babelHelpers.classPrivateFieldGetLoose(this, _x);
  }
});
new Foo().test();
