class Base {
  static #foo = 1;

  static m() {
    return this.#foo;
  }

  static update(val) {
    return this.#foo = val;
  }
}

class Sub1 extends Base {
  static #foo = 2;

  static update(val) {
    return this.#foo = val;
  }
}

class Sub2 extends Base {
}

assert.equal(Base.m(), 1);
assert.equal(Sub1.m(), 1);
assert.equal(Sub2.m(), 1);

assert.equal(Sub1.update(3), 3);
assert.equal(Base.m(), 1);
assert.equal(Sub1.m(), 1);
assert.equal(Sub2.m(), 1);

assert.equal(Base.update(4), 4);
assert.equal(Base.m(), 4);
assert.equal(Sub1.m(), 4);
assert.equal(Sub2.m(), 4);

assert.equal(Sub2.update(5), 5);
assert.equal(Base.m(), 5);
assert.equal(Sub1.m(), 5);
assert.equal(Sub2.m(), 5);
