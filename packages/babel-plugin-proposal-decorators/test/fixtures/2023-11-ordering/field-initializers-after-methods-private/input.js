var counter = 0;

class A {
  @((_, { addInitializer }) => {
    addInitializer(function () {
      counter++;
      expect(typeof this.method).toBe("function");
      expect(this.#foo).toBe("#foo");
      expect(() => this.#bar).toThrow();
    });
  })
  #foo = (() => {
    counter++;
    expect(typeof this.method).toBe("function");
    expect(() => this.#foo).toThrow();
    expect(() => this.#bar).toThrow();
    return "#foo";
  })();

  method() {}

  #bar = (() => {
    counter++;
    expect(typeof this.method).toBe("function");
    expect(this.#foo).toBe("#foo");
    expect(() => this.#bar).toThrow();
  })();
}

expect(counter).toBe(0);

new A();

expect(counter).toBe(3);
