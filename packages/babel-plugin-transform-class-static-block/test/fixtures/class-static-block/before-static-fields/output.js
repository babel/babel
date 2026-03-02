class A {
  static bar = (f1(), 3);
  static #foo = (f2(), (() => {
    do f3(); while (false);
  })(), 4);
}
