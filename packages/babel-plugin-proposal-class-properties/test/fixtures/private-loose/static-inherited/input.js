class Base {
  static #foo = 1;

  static getThis() {
    return this.#foo;
  }

  static updateThis(val) {
    return (this.#foo = val);
  }

  static getClass() {
    return Base.#foo;
  }

  static updateClass(val) {
    return (Base.#foo = val);
  }
}

class Sub1 extends Base {
  static #foo = 2;

  static update(val) {
    return (this.#foo = val);
  }
}

class Sub2 extends Base {}
