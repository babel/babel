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
    var _o$Foo, _o$Foo2, _o$Foo3, _o$Foo$self$getSelf, _o$Foo4, _o$Foo4$self, _o$Foo$self$getSelf2, _o$Foo$self;

    const Foo = this;
    const o = {
      Foo: Foo
    };
    (Foo === null || Foo === void 0 ? void 0 : Foo["m"].bind(Foo))();
    (Foo === null || Foo === void 0 ? void 0 : Foo["m"].bind(Foo))().toString;
    (Foo === null || Foo === void 0 ? void 0 : Foo["m"].bind(Foo))().toString();
    (o === null || o === void 0 ? void 0 : (_o$Foo = o.Foo).m.bind(_o$Foo))();
    (o === null || o === void 0 ? void 0 : (_o$Foo2 = o.Foo).m.bind(_o$Foo2))().toString;
    (o === null || o === void 0 ? void 0 : (_o$Foo3 = o.Foo).m.bind(_o$Foo3))().toString();
    ((_o$Foo$self$getSelf = ((_o$Foo4 = o.Foo) === null || _o$Foo4 === void 0 ? void 0 : (_o$Foo4$self = _o$Foo4.self).getSelf.bind(_o$Foo4$self))()) === null || _o$Foo$self$getSelf === void 0 ? void 0 : _o$Foo$self$getSelf.m.bind(_o$Foo$self$getSelf))();
    ((_o$Foo$self$getSelf2 = ((_o$Foo$self = o.Foo.self) === null || _o$Foo$self === void 0 ? void 0 : _o$Foo$self.getSelf.bind(_o$Foo$self))()) === null || _o$Foo$self$getSelf2 === void 0 ? void 0 : _o$Foo$self$getSelf2.m.bind(_o$Foo$self$getSelf2))();
  }

}

new Foo().test();
