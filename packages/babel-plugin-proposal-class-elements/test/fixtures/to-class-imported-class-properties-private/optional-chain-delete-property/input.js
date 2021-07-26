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

    delete Foo?.#self.unicorn;
    delete deep?.very.o?.Foo.#self.unicorn;

    delete o?.Foo.#self.unicorn;
    delete o?.Foo.#self.self.unicorn;
    delete o?.Foo.#self?.self.unicorn;
    delete o?.Foo.#self.self?.self.unicorn;
    delete o?.Foo.#self?.self?.self.unicorn;

    delete o?.Foo.#self.getSelf().unicorn;
    delete o?.Foo.#self.getSelf?.().unicorn;
    delete o?.Foo.#self?.getSelf().unicorn;
    delete o?.Foo.#self?.getSelf?.().unicorn;
    delete o?.Foo.#self.getSelf()?.self.unicorn;
    delete o?.Foo.#self.getSelf?.()?.self.unicorn;
    delete o?.Foo.#self?.getSelf()?.self.unicorn;
    delete o?.Foo.#self?.getSelf?.()?.self.unicorn;

    delete fn?.().Foo.#self.unicorn;
    delete fnDeep?.().very.o?.Foo.#self.unicorn;

    delete fn?.().Foo.#self.unicorn;
    delete fn?.().Foo.#self.self.unicorn;
    delete fn?.().Foo.#self?.self.unicorn;
    delete fn?.().Foo.#self.self?.self.unicorn;
    delete fn?.().Foo.#self?.self?.self.unicorn;

    delete fn?.().Foo.#self.getSelf().unicorn;
    delete fn?.().Foo.#self.getSelf?.().unicorn;
    delete fn?.().Foo.#self?.getSelf().unicorn;
    delete fn?.().Foo.#self?.getSelf?.().unicorn;
    delete fn?.().Foo.#self.getSelf()?.self.unicorn;
    delete fn?.().Foo.#self.getSelf?.()?.self.unicorn;
    delete fn?.().Foo.#self?.getSelf()?.self.unicorn;
    delete fn?.().Foo.#self?.getSelf?.()?.self.unicorn;

  }
}

Foo.test();
