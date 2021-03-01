class A {
  counter = 0;
  #method() {}
  self() {
    this.counter++;
    return this;
  }

  constructor() {
    expect(() => this.self().#method = 2).toThrow(TypeError);
    expect(this.counter).toBe(1);
  }
}

new A;
