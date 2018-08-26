class Foo {
  static test() {
    return babelHelpers.classStaticPrivateFieldLooseBase(Foo, Foo)._bar;
  }

  test() {
    return babelHelpers.classStaticPrivateFieldLooseBase(Foo, Foo)._bar;
  }

}

Object.defineProperty(Foo, "_bar", {
  value: void 0,
  enumerable: false,
  configurable: false,
  writable: true
});
