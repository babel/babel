class Base {
  static #foo = 1;

  static getThis() {
    return this.#foo;
  }

  static updateThis(val) {
    return this.#foo = val;
  }

  static getClass() {
    return Base.#foo;
  }

  static updateClass(val) {
    return Base.#foo = val;
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

assert.equal(Base.getThis(), 1);
assert.equal(Base.getClass(), 1);
assert.throws(() => Sub1.getThis());
assert.equal(Sub1.getClass(), 1);
assert.throws(() => Sub2.getThis());
assert.equal(Sub2.getClass(), 1);

assert.equal(Sub1.update(3), 3);
assert.equal(Base.getThis(), 1);
assert.equal(Base.getClass(), 1);
assert.throws(() => Sub1.getThis());
assert.equal(Sub1.getClass(), 1);
assert.throws(() => Sub2.getThis());
assert.equal(Sub2.getClass(), 1);

assert.equal(Base.updateThis(4), 4);
assert.equal(Base.getThis(), 4);
assert.equal(Base.getClass(), 4);
assert.throws(() => Sub1.getThis());
assert.equal(Sub1.getClass(), 4);
assert.throws(() => Sub2.getThis());
assert.equal(Sub2.getClass(), 4);

assert.equal(Base.updateClass(5), 5);
assert.equal(Base.getThis(), 5);
assert.equal(Base.getClass(), 5);
assert.throws(() => Sub1.getThis());
assert.equal(Sub1.getClass(), 5);
assert.throws(() => Sub2.getThis());
assert.equal(Sub2.getClass(), 5);

assert.throws(() => Sub2.updateThis(6));
assert.equal(Sub2.updateClass(7), 7);
assert.equal(Base.getThis(), 7);
assert.equal(Base.getClass(), 7);
assert.throws(() => Sub1.getThis());
assert.equal(Sub1.getClass(), 7);
assert.throws(() => Sub2.getThis());
assert.equal(Sub2.getClass(), 7);
