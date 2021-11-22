class Foo {
  bar() {
    super.bar.apply(this, babelHelpers.spreadIterableOrArray([arg1, arg2], args));
  }

}
