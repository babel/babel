let results = [];
class Foo {
  constructor() {
    this.self.#privateFieldValue = results.push(2);
  }

  get self() {
    results.push(1);
    return this;
  }

  get #privateFieldValue() {
    return 42;
  }
}

expect(() => new Foo).toThrow(TypeError);
expect(results).toStrictEqual([1, 2]);
