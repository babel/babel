class Foo {}

function _tag() {
  babelHelpers.classCheckPrivateStaticAccess(this, Foo, _tag).bind(this)``;
}

new Foo();
