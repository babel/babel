class Base {
  get test() {
  }
}

class Sub extends Base {
  // Redefining method here
  test() {
    return 1;
  }
}

expect(new Sub().test()).toBe(1);

