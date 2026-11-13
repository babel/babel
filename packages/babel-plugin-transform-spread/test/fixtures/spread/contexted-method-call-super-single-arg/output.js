class Foo {
  bar() {
    babelHelpers.callSpread(super.bar, this, babelHelpers.toConsumableArray(args));
  }
}
