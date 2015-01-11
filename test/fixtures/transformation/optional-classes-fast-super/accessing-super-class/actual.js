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
    super();
    super(...arguments);
    super("test", ...arguments);
  }

  static foo() {
    super();
    super(...arguments);
    super("test", ...arguments);
  }
}
