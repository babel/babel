class Foo {
  static #x = 1;
  static #m = function() { return this.#x; };
  static #self = Foo;
  static self = Foo;
  static getSelf() { return this }

  static test() {
    const o = { Foo: Foo };
    const deep = { very: { o } };
    function fn() {
      return o;
    }
    function fnDeep() {
      return deep;
    }

    Foo?.#m();
    Foo?.#m().toString;
    Foo?.#m().toString();

    o?.Foo.#m();
    o?.Foo.#m().toString;
    o?.Foo.#m().toString();

    deep?.very.o?.Foo.#m();
    deep?.very.o?.Foo.#m().toString;
    deep?.very.o?.Foo.#m().toString();

    o?.Foo.#self.#m();
    o?.Foo.#self.self.#m();
    o?.Foo.#self?.self.#m();
    o?.Foo.#self.self?.self.#m();
    o?.Foo.#self?.self?.self.#m();

    o?.Foo.#self.getSelf().#m();
    o?.Foo.#self.getSelf?.().#m();
    o?.Foo.#self?.getSelf().#m();
    o?.Foo.#self?.getSelf?.().#m();
    o?.Foo.#self.getSelf()?.self.#m();
    o?.Foo.#self.getSelf?.()?.self.#m();
    o?.Foo.#self?.getSelf()?.self.#m();
    o?.Foo.#self?.getSelf?.()?.self.#m();

    fn?.().Foo.#m();
    fn?.().Foo.#m().toString;
    fn?.().Foo.#m().toString();

    fnDeep?.().very.o?.Foo.#m();
    fnDeep?.().very.o?.Foo.#m().toString;
    fnDeep?.().very.o?.Foo.#m().toString();

    fn?.().Foo.#self.#m();
    fn?.().Foo.#self.self.#m();
    fn?.().Foo.#self?.self.#m();
    fn?.().Foo.#self.self?.self.#m();
    fn?.().Foo.#self?.self?.self.#m();

    fn?.().Foo.#self.getSelf().#m();
    fn?.().Foo.#self.getSelf?.().#m();
    fn?.().Foo.#self?.getSelf().#m();
    fn?.().Foo.#self?.getSelf?.().#m();
    fn?.().Foo.#self.getSelf()?.self.#m();
    fn?.().Foo.#self.getSelf?.()?.self.#m();
    fn?.().Foo.#self?.getSelf()?.self.#m();
    fn?.().Foo.#self?.getSelf?.()?.self.#m();
  }
}

Foo.test();
