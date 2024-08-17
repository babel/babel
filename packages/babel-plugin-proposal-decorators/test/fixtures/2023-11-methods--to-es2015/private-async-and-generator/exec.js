let counter = 0;

class Foo {
  @(function (fn) {
    counter++;
    expect(fn.constructor.name).toBe("AsyncFunction");
  })
  async #a() {}

  @(function (fn) {
    counter++;
    expect(fn.constructor.name).toBe("GeneratorFunction");
  })
  *#g() {}

  @(function (fn) {
    counter++;
    expect(fn.constructor.name).toBe("AsyncGeneratorFunction");
  })
  async *#ag() {}
}

expect(counter).toBe(3);
