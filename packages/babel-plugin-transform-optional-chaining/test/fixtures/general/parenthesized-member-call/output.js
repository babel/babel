class Foo {
  constructor() {
    this.x = 1;
    this.self = this;
  }
  m() {
    return this.x;
  }
  getSelf() {
    return this;
  }
  test() {
    var _o$Foo$self$getSelf, _o$Foo, _o$Foo$self$getSelf2, _o$Foo$self, _fn$Foo$self$getSelf, _fn, _fn$Foo$self$getSelf2, _fn$Foo$self;
    const Foo = this;
    const o = {
      Foo: Foo
    };
    const fn = function () {
      return o;
    };
    Foo === null || Foo === void 0 ? (void 0)() : Foo["m"]();
    (Foo === null || Foo === void 0 ? (void 0)() : Foo["m"]()).toString;
    (Foo === null || Foo === void 0 ? (void 0)() : Foo["m"]()).toString();
    o === null || o === void 0 ? (void 0)() : o.Foo.m();
    (o === null || o === void 0 ? (void 0)() : o.Foo.m()).toString;
    (o === null || o === void 0 ? (void 0)() : o.Foo.m()).toString();
    (_o$Foo$self$getSelf = (_o$Foo = o.Foo) === null || _o$Foo === void 0 ? (void 0)() : _o$Foo.self.getSelf()) === null || _o$Foo$self$getSelf === void 0 ? (void 0)() : _o$Foo$self$getSelf.m();
    (_o$Foo$self$getSelf2 = (_o$Foo$self = o.Foo.self) === null || _o$Foo$self === void 0 ? (void 0)() : _o$Foo$self.getSelf()) === null || _o$Foo$self$getSelf2 === void 0 ? (void 0)() : _o$Foo$self$getSelf2.m();
    (_fn$Foo$self$getSelf = (_fn = fn()) === null || _fn === void 0 || (_fn = _fn.Foo) === null || _fn === void 0 ? (void 0)() : _fn.self.getSelf()) === null || _fn$Foo$self$getSelf === void 0 ? (void 0)() : _fn$Foo$self$getSelf.m();
    (_fn$Foo$self$getSelf2 = fn === null || fn === void 0 || (_fn$Foo$self = fn().Foo.self) === null || _fn$Foo$self === void 0 ? (void 0)() : _fn$Foo$self.getSelf()) === null || _fn$Foo$self$getSelf2 === void 0 ? (void 0)() : _fn$Foo$self$getSelf2.m();
  }
}
new Foo().test();
