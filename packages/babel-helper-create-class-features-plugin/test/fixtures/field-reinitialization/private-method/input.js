class Base {
  constructor(obj) {
    return obj;
  }
}

class Derived extends Base {
  #foo() {
    return 'bar';
  }

  static get(obj) {
    return obj.#foo();
  }
}
