class Foo {
  #foo = 0;

  test(other) {
    return [
      this.#foo++,
      this.#foo,
      ++this.#foo,
      this.#foo,
      other.obj.#foo++,
      other.obj.#foo,
      ++other.obj.#foo,
      other.obj.#foo,
    ];
  }
}

const f = new Foo;
const results = f.test({ obj: f });
assert.equal(results[0], 0);
assert.equal(results[1], 1);
assert.equal(results[2], 2);
assert.equal(results[3], 2);
assert.equal(results[4], 2);
assert.equal(results[5], 3);
assert.equal(results[6], 4);
assert.equal(results[7], 4);
