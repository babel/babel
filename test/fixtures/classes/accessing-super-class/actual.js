class Test extends Foo {
  constructor() {
    woops.super.test();
    super();
    super.test();
    foob(super);
  }

  test() {
    super();
  }

  static foo() {
    super();
  }
}
