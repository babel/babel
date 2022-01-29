class Foo {
  bar() {
    super.bar.apply(this, babelHelpers.spreadCoerceToArray(args));
  }

}
