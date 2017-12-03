class A {

  constructor() {
    this.x = 1;
  }

  set a(value) {}

  get b() {}

  static S() {}

  static get T() {}

  static "U"() {}

  static "Hello World"() {}

  foo() {}
}

class B extends A {
  constructor() {
    super(1);
    super.foo();
  }

  static x() {
    super.x();
    super.y;
  }
}

(class C {});

new class {};
