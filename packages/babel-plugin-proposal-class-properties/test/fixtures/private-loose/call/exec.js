class Foo {
  #foo = function() {
    return this;
  }

  test(other) {
    return [this.#foo(), other.#foo()];
  }
}

const f = new Foo;
const o = new Foo;
const test = f.test(o);
expect(test[0]).toBe(f);
expect(test[1]).toBe(o);
