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

expect(Base.getThis()).toBe(1);
expect(Base.getClass()).toBe(1);
assert.throws(() => Sub1.getThis());
expect(Sub1.getClass()).toBe(1);
assert.throws(() => Sub2.getThis());
expect(Sub2.getClass()).toBe(1);

expect(Sub1.update(3)).toBe(3);
expect(Base.getThis()).toBe(1);
expect(Base.getClass()).toBe(1);
assert.throws(() => Sub1.getThis());
expect(Sub1.getClass()).toBe(1);
assert.throws(() => Sub2.getThis());
expect(Sub2.getClass()).toBe(1);

expect(Base.updateThis(4)).toBe(4);
expect(Base.getThis()).toBe(4);
expect(Base.getClass()).toBe(4);
assert.throws(() => Sub1.getThis());
expect(Sub1.getClass()).toBe(4);
assert.throws(() => Sub2.getThis());
expect(Sub2.getClass()).toBe(4);

expect(Base.updateClass(5)).toBe(5);
expect(Base.getThis()).toBe(5);
expect(Base.getClass()).toBe(5);
assert.throws(() => Sub1.getThis());
expect(Sub1.getClass()).toBe(5);
assert.throws(() => Sub2.getThis());
expect(Sub2.getClass()).toBe(5);

assert.throws(() => Sub2.updateThis(6));
expect(Sub2.updateClass(7)).toBe(7);
expect(Base.getThis()).toBe(7);
expect(Base.getClass()).toBe(7);
assert.throws(() => Sub1.getThis());
expect(Sub1.getClass()).toBe(7);
assert.throws(() => Sub2.getThis());
expect(Sub2.getClass()).toBe(7);
