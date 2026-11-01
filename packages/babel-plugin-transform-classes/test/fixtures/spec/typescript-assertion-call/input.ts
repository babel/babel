class A {
  m() {
    return this;
  }
  static s() {
    return this;
  }
}

class B extends A {
  as() {
    return (super.m as any)();
  }
  nonNull() {
    return super.m!();
  }
  static as() {
    return (super.s as any)();
  }
}
