let Foo = babelHelpers.decorate(class Foo {
  method1() {}

  method2() {}

  method3() {}

  undecorated() {}

}, [["undecorated"]], [["method1", [dec1]], ["method2", [dec2(a, b, c)]], ["method3", [dec3outer, dec3inner]]], void 0)([]);