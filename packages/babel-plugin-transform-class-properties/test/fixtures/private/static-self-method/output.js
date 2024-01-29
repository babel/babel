var _Foo;
var f = _Foo = class Foo {};
function _bar() {
  return _Foo;
}
function _method() {
  return function inner() {
    return _Foo;
  };
}
function _method_shadowed() {
  new _Foo();
  return function inner() {
    var Foo = 3;
    return Foo;
  };
}
