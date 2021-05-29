class Foo {
  static get privateTagMethod() {
    return babelHelpers.classStaticPrivateMethodGet(this, Foo, _tag).bind(this)``;
  }

}

function _tag() {
  return this;
}
