var _Foo;
var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
var _m = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("m");
class Foo {
  static getSelf() {
    return Foo;
  }
  test() {
    var _o$Foo$self$getSelf, _o$Foo$self$getSelf2, _fn$Foo$self$getSelf, _fn$Foo$self$getSelf2, _o$Foo, _o$Foo$self, _fn, _fn$Foo$self;
    const o = {
      Foo: Foo
    };
    const fn = function () {
      return o;
    };
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(Foo, _m).bind(Foo))();
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(Foo, _m).bind(Foo))().toString;
    (Foo === null || Foo === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(Foo, _m).bind(Foo))().toString();
    (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(o.Foo, _m).bind(o.Foo))();
    (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(o.Foo, _m).bind(o.Foo))().toString;
    (o === null || o === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(o.Foo, _m).bind(o.Foo))().toString();
    ((_o$Foo$self$getSelf = ((_o$Foo = o.Foo) == null ? void 0 : _o$Foo.self.getSelf.bind(_o$Foo.self))()) === null || _o$Foo$self$getSelf === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(_o$Foo$self$getSelf, _m).bind(_o$Foo$self$getSelf))();
    ((_o$Foo$self$getSelf2 = ((_o$Foo$self = o.Foo.self) == null ? void 0 : _o$Foo$self.getSelf.bind(_o$Foo$self))()) === null || _o$Foo$self$getSelf2 === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(_o$Foo$self$getSelf2, _m).bind(_o$Foo$self$getSelf2))();
    ((_fn$Foo$self$getSelf = ((_fn = fn()) == null || (_fn = _fn.Foo) == null ? void 0 : _fn.self.getSelf.bind(_fn.self))()) === null || _fn$Foo$self$getSelf === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(_fn$Foo$self$getSelf, _m).bind(_fn$Foo$self$getSelf))();
    ((_fn$Foo$self$getSelf2 = (fn == null || (_fn$Foo$self = fn().Foo.self) == null ? void 0 : _fn$Foo$self.getSelf.bind(_fn$Foo$self))()) === null || _fn$Foo$self$getSelf2 === void 0 ? void 0 : babelHelpers.classPrivateFieldLoose(_fn$Foo$self$getSelf2, _m).bind(_fn$Foo$self$getSelf2))();
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
    return babelHelpers.classPrivateFieldLoose(this, _x);
  }
});
new Foo().test();
