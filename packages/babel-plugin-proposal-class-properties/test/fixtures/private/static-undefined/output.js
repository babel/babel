class Foo {
  static test() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _bar);
  }

  test() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _bar);
  }

}

var _bar = {
  writable: true,
  value: void 0
};
