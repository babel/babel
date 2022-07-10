class Foo {
  static test() {
    var receiver = babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _tag).bind(this)``;
    expect(receiver).toBe(this);
  }

}

function _get_tag() {
  return function () {
    return this;
  };
}

var _tag = {
  get: _get_tag,
  set: void 0
};
