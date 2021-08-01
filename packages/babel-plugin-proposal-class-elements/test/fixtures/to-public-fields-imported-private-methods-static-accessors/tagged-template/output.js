class Foo {
  static test() {
    const receiver = babelHelpers.classCheckPrivateStaticAccess(this, Foo, _get_tag).call(Foo).bind(this)``;
    expect(receiver).toBe(this);
  }

}

function _get_tag() {
  return function () {
    return this;
  };
}
