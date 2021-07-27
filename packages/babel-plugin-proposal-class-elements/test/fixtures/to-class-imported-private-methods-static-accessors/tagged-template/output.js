class Foo {
  static test() {
    const receiver = babelHelpers.classCheckPrivateStaticAccess(this, Foo, _get_tag).call(Foo).bind(this)``;
  }

}

function _get_tag() {
  return function () {
    return this;
  };
}
