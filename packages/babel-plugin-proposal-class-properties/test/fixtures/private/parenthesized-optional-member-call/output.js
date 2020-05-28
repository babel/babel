class Foo {
  static getSelf() {
    return Foo;
  }

  test() {
    var _o$Foo$self$getSelf, _o$Foo$self$getSelf2;

    const o = {
      Foo: Foo
    };
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _m).bind(Foo))();
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _m).bind(Foo))().toString;
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _m).bind(Foo))().toString();
    (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _m).bind(o.Foo))();
    (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _m).bind(o.Foo))().toString;
    (o === null || o === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(o.Foo, Foo, _m).bind(o.Foo))().toString();
    ((_o$Foo$self$getSelf = (o.Foo?.self.getSelf)()) === null || _o$Foo$self$getSelf === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$Foo$self$getSelf, Foo, _m).bind(_o$Foo$self$getSelf))();
    ((_o$Foo$self$getSelf2 = (o.Foo.self?.getSelf)()) === null || _o$Foo$self$getSelf2 === void 0 ? void 0 : babelHelpers.classStaticPrivateFieldSpecGet(_o$Foo$self$getSelf2, Foo, _m).bind(_o$Foo$self$getSelf2))();
  }

}

var _x = {
  writable: true,
  value: 1
};
babelHelpers.defineProperty(Foo, "self", Foo);
var _m = {
  writable: true,
  value: function () {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _x);
  }
};
new Foo().test();
