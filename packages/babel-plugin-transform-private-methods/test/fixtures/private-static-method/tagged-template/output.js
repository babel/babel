var _Foo;
class Foo {}
_Foo = Foo;
function _tag() {
  babelHelpers.assertClassBrand(this, _Foo, _tag).bind(this)``;
}
new Foo();
