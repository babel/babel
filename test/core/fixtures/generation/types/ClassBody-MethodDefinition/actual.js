class Foo {
  async foo() {}
  foo() {}
  @bar @baz foo() {}
  ["foo"]() {}
  get foo() {}
  set foo(bar) {}

  static async foo() {}
  static foo() {}
  static ["foo"]() {}
  static get foo() {}
  static set foo(bar) {}
}
