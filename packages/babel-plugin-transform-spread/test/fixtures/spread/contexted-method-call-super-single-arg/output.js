class Foo {
  bar() {
    Function.prototype.apply.call(super.bar, this, babelHelpers.toConsumableArray(args));
  }
}
