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
    var _o$Foo, _o$Foo2, _o$Foo3, _o$Foo$self$getSelf, _o$Foo4, _o$Foo4$self, _o$Foo$self$getSelf2, _o$Foo$self, _fn$Foo$self$getSelf, _fn, _fn$self, _fn$Foo$self$getSelf2, _fn$Foo$self;
    const Foo = this;
    const o = {
      Foo: Foo
    };
    const fn = function () {
      return o;
    };
    (Foo === null || Foo === void 0 ? void 0 : Foo["m"].bind(Foo))();
    (Foo === null || Foo === void 0 ? void 0 : Foo["m"].bind(Foo))().toString;
    (Foo === null || Foo === void 0 ? void 0 : Foo["m"].bind(Foo))().toString();
    (o === null || o === void 0 ? void 0 : (_o$Foo = o.Foo).m.bind(_o$Foo))();
    (o === null || o === void 0 ? void 0 : (_o$Foo2 = o.Foo).m.bind(_o$Foo2))().toString;
    (o === null || o === void 0 ? void 0 : (_o$Foo3 = o.Foo).m.bind(_o$Foo3))().toString();
    ((_o$Foo$self$getSelf = ((_o$Foo4 = o.Foo) === null || _o$Foo4 === void 0 ? void 0 : (_o$Foo4$self = _o$Foo4.self).getSelf.bind(_o$Foo4$self))()) === null || _o$Foo$self$getSelf === void 0 ? void 0 : _o$Foo$self$getSelf.m.bind(_o$Foo$self$getSelf))();
    ((_o$Foo$self$getSelf2 = ((_o$Foo$self = o.Foo.self) === null || _o$Foo$self === void 0 ? void 0 : _o$Foo$self.getSelf.bind(_o$Foo$self))()) === null || _o$Foo$self$getSelf2 === void 0 ? void 0 : _o$Foo$self$getSelf2.m.bind(_o$Foo$self$getSelf2))();
    ((_fn$Foo$self$getSelf = ((_fn = fn()) === null || _fn === void 0 || (_fn = _fn.Foo) === null || _fn === void 0 ? void 0 : (_fn$self = _fn.self).getSelf.bind(_fn$self))()) === null || _fn$Foo$self$getSelf === void 0 ? void 0 : _fn$Foo$self$getSelf.m.bind(_fn$Foo$self$getSelf))();
    ((_fn$Foo$self$getSelf2 = (fn === null || fn === void 0 || (_fn$Foo$self = fn().Foo.self) === null || _fn$Foo$self === void 0 ? void 0 : _fn$Foo$self.getSelf.bind(_fn$Foo$self))()) === null || _fn$Foo$self$getSelf2 === void 0 ? void 0 : _fn$Foo$self$getSelf2.m.bind(_fn$Foo$self$getSelf2))();
  }
}
new Foo().test();
