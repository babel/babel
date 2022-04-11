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
    expect(() => delete Foo?.#self.unicorn).toThrow(TypeError);
    expect(() => delete deep?.very.o?.Foo.#self.unicorn).toThrow(TypeError);

    expect(() => delete o?.Foo.#self.unicorn).toThrow(TypeError);
    expect(() => delete o?.Foo.#self.self.unicorn).toThrow(TypeError);
    expect(() => delete o?.Foo.#self?.self.unicorn).toThrow(TypeError);
    expect(() => delete o?.Foo.#self.self?.self.unicorn).toThrow(TypeError);
    expect(() => delete o?.Foo.#self?.self?.self.unicorn).toThrow(TypeError);

    expect(() => delete o?.Foo.#self.getSelf().unicorn).toThrow(TypeError);
    expect(() => delete o?.Foo.#self.getSelf?.().unicorn).toThrow(TypeError);
    expect(() => delete o?.Foo.#self?.getSelf().unicorn).toThrow(TypeError);
    expect(() => delete o?.Foo.#self?.getSelf?.().unicorn).toThrow(TypeError);
    expect(() => delete o?.Foo.#self.getSelf()?.self.unicorn).toThrow(TypeError);
    expect(() => delete o?.Foo.#self.getSelf?.()?.self.unicorn).toThrow(TypeError);
    expect(() => delete o?.Foo.#self?.getSelf()?.self.unicorn).toThrow(TypeError);
    expect(() => delete o?.Foo.#self?.getSelf?.()?.self.unicorn).toThrow(TypeError);

    expect(() => delete fn?.().Foo.#self.unicorn).toThrow(TypeError);
    expect(() => delete fnDeep?.().very.o?.Foo.#self.unicorn).toThrow(TypeError);

    expect(() => delete fn?.().Foo.#self.unicorn).toThrow(TypeError);
    expect(() => delete fn?.().Foo.#self.self.unicorn).toThrow(TypeError);
    expect(() => delete fn?.().Foo.#self?.self.unicorn).toThrow(TypeError);
    expect(() => delete fn?.().Foo.#self.self?.self.unicorn).toThrow(TypeError);
    expect(() => delete fn?.().Foo.#self?.self?.self.unicorn).toThrow(TypeError);

    expect(() => delete fn?.().Foo.#self.getSelf().unicorn).toThrow(TypeError);
    expect(() => delete fn?.().Foo.#self.getSelf?.().unicorn).toThrow(TypeError);
    expect(() => delete fn?.().Foo.#self?.getSelf().unicorn).toThrow(TypeError);
    expect(() => delete fn?.().Foo.#self?.getSelf?.().unicorn).toThrow(TypeError);
    expect(() => delete fn?.().Foo.#self.getSelf()?.self.unicorn).toThrow(TypeError);
    expect(() => delete fn?.().Foo.#self.getSelf?.()?.self.unicorn).toThrow(TypeError);
    expect(() => delete fn?.().Foo.#self?.getSelf()?.self.unicorn).toThrow(TypeError);
    expect(() => delete fn?.().Foo.#self?.getSelf?.()?.self.unicorn).toThrow(TypeError);


  }

  static testNull() {
    const o = null;
    const deep = { very: { o } };
    const fn = null;
    function fnDeep() {
      return deep;
    }

    expect(delete deep?.very.o?.Foo.#self.unicorn).toBe(true);

    expect(delete o?.Foo.#self.unicorn).toBe(true);
    expect(delete o?.Foo.#self.self.unicorn).toBe(true);
    expect(delete o?.Foo.#self?.self.unicorn).toBe(true);
    expect(delete o?.Foo.#self.self?.self.unicorn).toBe(true);
    expect(delete o?.Foo.#self?.self?.self.unicorn).toBe(true);

    expect(delete o?.Foo.#self.getSelf().unicorn).toBe(true);
    expect(delete o?.Foo.#self.getSelf?.().unicorn).toBe(true);
    expect(delete o?.Foo.#self?.getSelf().unicorn).toBe(true);
    expect(delete o?.Foo.#self?.getSelf?.().unicorn).toBe(true);
    expect(delete o?.Foo.#self.getSelf()?.self.unicorn).toBe(true);
    expect(delete o?.Foo.#self.getSelf?.()?.self.unicorn).toBe(true);
    expect(delete o?.Foo.#self?.getSelf()?.self.unicorn).toBe(true);
    expect(delete o?.Foo.#self?.getSelf?.()?.self.unicorn).toBe(true);

    expect(delete fn?.().Foo.#self.unicorn).toBe(true);
    expect(delete fnDeep?.().very.o?.Foo.#self.unicorn).toBe(true);

    expect(delete fn?.().Foo.#self.unicorn).toBe(true);
    expect(delete fn?.().Foo.#self.self.unicorn).toBe(true);
    expect(delete fn?.().Foo.#self?.self.unicorn).toBe(true);
    expect(delete fn?.().Foo.#self.self?.self.unicorn).toBe(true);
    expect(delete fn?.().Foo.#self?.self?.self.unicorn).toBe(true);

    expect(delete fn?.().Foo.#self.getSelf().unicorn).toBe(true);
    expect(delete fn?.().Foo.#self.getSelf?.().unicorn).toBe(true);
    expect(delete fn?.().Foo.#self?.getSelf().unicorn).toBe(true);
    expect(delete fn?.().Foo.#self?.getSelf?.().unicorn).toBe(true);
    expect(delete fn?.().Foo.#self.getSelf()?.self.unicorn).toBe(true);
    expect(delete fn?.().Foo.#self.getSelf?.()?.self.unicorn).toBe(true);
    expect(delete fn?.().Foo.#self?.getSelf()?.self.unicorn).toBe(true);
    expect(delete fn?.().Foo.#self?.getSelf?.()?.self.unicorn).toBe(true);
  }
}

Object.defineProperty(Foo, "unicorn", { configurable: false });
Foo.test();
Foo.testNull();
