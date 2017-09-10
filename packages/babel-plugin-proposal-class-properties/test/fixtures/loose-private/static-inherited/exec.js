class Base {
  static #foo = 1;

  static m() {
    return this.#foo;
  }
}

class Sub1 extends Base {
  static #foo = 2;
}

class Sub2 extends Base {
}

assert.equal(Base.m(), 1);
assert.equal(Sub1.m(), 1);
assert.equal(Sub2.m(), 1);
