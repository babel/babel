class A {
  constructor() {
    new this.b
  }

  static [b]() {}

  [x + '1']() {}
}