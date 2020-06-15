class Foo {
  static #x = 1;
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

    Foo?.#x;
    Foo?.#x.toString;
    Foo?.#x.toString();

    o?.Foo?.#x;
    o?.Foo?.#x.toString;
    o?.Foo?.#x.toString();

    deep?.very.o?.Foo?.#x;
    deep?.very.o?.Foo?.#x.toString;
    deep?.very.o?.Foo?.#x.toString();

    o?.Foo.#self?.#x;
    o?.Foo.#self.self?.#x;
    o?.Foo.#self?.self?.#x;
    o?.Foo.#self.self?.self?.#x;
    o?.Foo.#self?.self?.self?.#x;

    o?.Foo.#self.getSelf()?.#x;
    o?.Foo.#self.getSelf?.()?.#x;
    o?.Foo.#self?.getSelf()?.#x;
    o?.Foo.#self?.getSelf?.()?.#x;
    o?.Foo.#self.getSelf()?.self?.#x;
    o?.Foo.#self.getSelf?.()?.self?.#x;
    o?.Foo.#self?.getSelf()?.self?.#x;
    o?.Foo.#self?.getSelf?.()?.self?.#x;

    fn?.().Foo?.#x;
    fn?.().Foo?.#x.toString;
    fn?.().Foo?.#x.toString();

    fnDeep?.().very.o?.Foo?.#x;
    fnDeep?.().very.o?.Foo?.#x.toString;
    fnDeep?.().very.o?.Foo?.#x.toString();

    fn?.().Foo.#self?.#x;
    fn?.().Foo.#self.self?.#x;
    fn?.().Foo.#self?.self?.#x;
    fn?.().Foo.#self.self?.self?.#x;
    fn?.().Foo.#self?.self?.self?.#x;

    fn?.().Foo.#self.getSelf()?.#x;
    fn?.().Foo.#self.getSelf?.()?.#x;
    fn?.().Foo.#self?.getSelf()?.#x;
    fn?.().Foo.#self?.getSelf?.()?.#x;
    fn?.().Foo.#self.getSelf()?.self?.#x;
    fn?.().Foo.#self.getSelf?.()?.self?.#x;
    fn?.().Foo.#self?.getSelf()?.self?.#x;
    fn?.().Foo.#self?.getSelf?.()?.self?.#x;
  }
}

Foo.test();
