let key = 'b';
class A {
  constructor() {
    new this[key]
  }

  [key]() {}
}

assert.throws(() => new A, "Cannot instantiate a method");