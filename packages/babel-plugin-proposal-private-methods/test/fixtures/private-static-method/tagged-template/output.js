class Foo {}

function _tag() {
  babelHelpers.classStaticPrivateMethodGet(this, Foo, _tag).bind(this)``;
}

new Foo();
