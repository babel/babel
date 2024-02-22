class Foo {
  static test() {
    var receiver = babelHelpers.classPrivateGetter(Foo, this, _get_tag).bind(this)``;
    expect(receiver).toBe(this);
  }
}
function _get_tag() {
  return function () {
    return this;
  };
}
