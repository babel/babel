class Foo {
  bar() {
    Function.prototype.apply.call(super.bar, this, [arg1, arg2].concat(babelHelpers.toConsumableArray(args)));
  }
}
