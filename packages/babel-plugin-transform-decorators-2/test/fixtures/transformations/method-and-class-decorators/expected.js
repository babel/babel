let Foo = babelHelpers.decorate(class Foo {
  method() {}

  undecorated() {}

}, [["undecorated"]], [["method", [methDec]]], void 0)([classDec]);