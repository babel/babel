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
    (Foo == null ? void 0 : Foo["m"].bind(Foo))();
    (Foo == null ? void 0 : Foo["m"].bind(Foo))().toString;
    (Foo == null ? void 0 : Foo["m"].bind(Foo))().toString();
    (o == null ? void 0 : o.Foo.m.bind(o.Foo))();
    (o == null ? void 0 : o.Foo.m.bind(o.Foo))().toString;
    (o == null ? void 0 : o.Foo.m.bind(o.Foo))().toString();
    ((_o$Foo$self$getSelf = ((_o$Foo = o.Foo) == null ? void 0 : _o$Foo.self.getSelf.bind(_o$Foo.self))()) == null ? void 0 : _o$Foo$self$getSelf.m.bind(_o$Foo$self$getSelf))();
    ((_o$Foo$self$getSelf2 = ((_o$Foo$self = o.Foo.self) == null ? void 0 : _o$Foo$self.getSelf.bind(_o$Foo$self))()) == null ? void 0 : _o$Foo$self$getSelf2.m.bind(_o$Foo$self$getSelf2))();
    ((_fn$Foo$self$getSelf = ((_fn = fn()) == null || (_fn = _fn.Foo) == null ? void 0 : _fn.self.getSelf.bind(_fn.self))()) == null ? void 0 : _fn$Foo$self$getSelf.m.bind(_fn$Foo$self$getSelf))();
    ((_fn$Foo$self$getSelf2 = (fn == null || (_fn$Foo$self = fn().Foo.self) == null ? void 0 : _fn$Foo$self.getSelf.bind(_fn$Foo$self))()) == null ? void 0 : _fn$Foo$self$getSelf2.m.bind(_fn$Foo$self$getSelf2))();
  }
}
new Foo().test();
