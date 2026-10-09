class A {
  static {
    f1();
  }
  static bar = 3;
  static {
    f2();
  }
  static {
    do f3(); while (false);
  }
  static #foo = 4;
}