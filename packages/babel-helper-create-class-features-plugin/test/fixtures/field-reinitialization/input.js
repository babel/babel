class Base {
  constructor(obj) {
    return obj;
  }
}

let counter = 1;
class Derived extends Base {
  #field = counter;
  static get(obj) {
    return obj.#field;
  }
}
