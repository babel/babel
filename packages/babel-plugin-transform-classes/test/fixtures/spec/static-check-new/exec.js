class A {
  static a() {
  }
}

assert.throws(() => new A.a(), "Cannot instantiate a method");