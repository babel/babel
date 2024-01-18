var _Foo;
class Foo {
  static getSelf() {
    return Foo;
  }
  test() {
    var _o$Foo, _o$Foo2, _o$Foo3, _o$Foo$self$getSelf, _o$Foo$self$getSelf2, _fn$Foo$self$getSelf, _fn$Foo$self$getSelf2;
    const o = {
      Foo: Foo
    };
    const fn = function () {
      return o;
    };
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _m).bind(Foo))();
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _m).bind(Foo))().toString;
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _m).bind(Foo))().toString();
    (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$Foo = o.Foo, Foo, _m).bind(_o$Foo))();
    (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$Foo2 = o.Foo, Foo, _m).bind(_o$Foo2))().toString;
    (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$Foo3 = o.Foo, Foo, _m).bind(_o$Foo3))().toString();
    ((_o$Foo$self$getSelf = (o.Foo?.self.getSelf)()) === null || _o$Foo$self$getSelf === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$Foo$self$getSelf, Foo, _m).bind(_o$Foo$self$getSelf))();
    ((_o$Foo$self$getSelf2 = (o.Foo.self?.getSelf)()) === null || _o$Foo$self$getSelf2 === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$Foo$self$getSelf2, Foo, _m).bind(_o$Foo$self$getSelf2))();
    ((_fn$Foo$self$getSelf = (fn()?.Foo?.self.getSelf)()) === null || _fn$Foo$self$getSelf === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_fn$Foo$self$getSelf, Foo, _m).bind(_fn$Foo$self$getSelf))();
    ((_fn$Foo$self$getSelf2 = (fn?.().Foo.self?.getSelf)()) === null || _fn$Foo$self$getSelf2 === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_fn$Foo$self$getSelf2, Foo, _m).bind(_fn$Foo$self$getSelf2))();
  }
}
_Foo = Foo;
var _x = {
  writable: true,
  value: 1
};
babelHelpers.defineProperty(Foo, "self", _Foo);
var _m = {
  writable: true,
  value: function () {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, _Foo, _x);
  }
};
new Foo().test();
