class Test extends Foo {
  constructor() {
    woops.super.test();
    super();
    super.test();

    super(...arguments);
    super("test", ...arguments);

    super.test(...arguments);
    super.test("test", ...arguments);
  }

  test() {
    super.test();
    super.test(...arguments);
    super.test("test", ...arguments);
  }

  static foo() {
    super.foo();
    super.foo(...arguments);
    super.foo("test", ...arguments);
  }
}
