const f = class Foo {
  static #x = Foo;
  static y = Foo;

  static extract() {
    return {
      x: Foo.#x,
      y: Foo.y,
    }
  }
};

const { x, y } = f.extract();
expect(x).toBe(f)
expect(y).toBe(f)
