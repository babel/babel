class Base {
  constructor(obj) {
    return obj;
  }
}

class Derived extends Base {
  get #foo() {
    return 'bar';
  }

  set #foo(value) {
    this.#foo = value;
  }

  static get(obj) {
    return obj.#foo();
  }
}
