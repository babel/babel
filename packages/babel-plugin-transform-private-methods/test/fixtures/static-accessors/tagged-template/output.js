class Foo {
  static test() {
    var receiver = babelHelpers.classPrivateGetter(this, Foo, _get_tag).bind(this)``;
    expect(receiver).toBe(this);
  }
}
function _get_tag() {
  return function () {
    return this;
  };
}
