class Base {
  constructor(obj) {
    return obj;
  }
}

let counter = 0;
class Derived extends Base {
  #foo = ++counter;
  static get(obj) {
    return obj.#foo;
  }
}
