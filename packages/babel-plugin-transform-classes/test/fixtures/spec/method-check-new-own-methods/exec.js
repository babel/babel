class A {
  constructor() {
    new this.b
  }

  b() {}
}

assert.throws(() => new A, "Cannot instantiate a method");