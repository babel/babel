class Foo {
  @dec1 method1() {}
  @dec2(a, b, c) method2() {}
  @dec3outer @dec3inner method3() {}
  undecorated() {}
}
