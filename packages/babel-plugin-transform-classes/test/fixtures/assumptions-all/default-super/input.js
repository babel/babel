class Test {
  constructor() {
    return super.constructor;
  }

  static test() {
    return super.constructor;
  }
}

// Instances
expect(Object.getPrototypeOf(Test.prototype)).toBe(Object.prototype);
expect(new Test()).toBe(Object);

// Static
expect(Object.getPrototypeOf(Test)).toBe(Function.prototype);
expect(Test.test()).toBe(Function);
