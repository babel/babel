class Foo {
  async foo() {}
  foo() {}
  ["foo"]() {}
  get foo() {}
  set foo() {}

  static async foo() {}
  static foo() {}
  static ["foo"]() {}
  static get foo() {}
  static set foo() {}
}
