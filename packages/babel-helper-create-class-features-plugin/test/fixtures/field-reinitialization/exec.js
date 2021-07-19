import { assert } from "console";

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

const obj = {};
new Derived(obj);
assert.equals(Derived.get(obj), 1);

assert.throws(() => {
  new Derived(obj);
});

assert.equals(Derived.get(foo), 1);
