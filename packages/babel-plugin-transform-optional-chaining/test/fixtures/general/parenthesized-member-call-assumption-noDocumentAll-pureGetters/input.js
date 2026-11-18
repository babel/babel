class Foo {
  constructor() {
    this.x = 1;
    this.self = this;
  }
  m() { return this.x; };
  getSelf() { return this }

  test() {
    const Foo = this;
    const o = { Foo: Foo };
    const fn = function () {
      return o;
    };

    (Foo?.["m"])();
    (Foo?.["m"])().toString;
    (Foo?.["m"])().toString();

    (o?.Foo.m)();
    (o?.Foo.m)().toString;
    (o?.Foo.m)().toString();

    (((o.Foo?.self.getSelf)())?.m)();
    (((o.Foo.self?.getSelf)())?.m)();

    (((fn()?.Foo?.self.getSelf)())?.m)();
    (((fn?.().Foo.self?.getSelf)())?.m)();
  }
}

(new Foo).test();
