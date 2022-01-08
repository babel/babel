class A extends B {
  constructor() {
    if (Math.random() > 0.5) {
      super(true);
    } else {
      super(false);
    }
  }

  @deco
  method() {}
}
