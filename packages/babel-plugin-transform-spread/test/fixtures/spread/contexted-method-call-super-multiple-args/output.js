class Foo {
  bar() {
    babelHelpers.callSpread(super.bar, this, [arg1, arg2].concat(babelHelpers.toConsumableArray(args)));
  }
}
