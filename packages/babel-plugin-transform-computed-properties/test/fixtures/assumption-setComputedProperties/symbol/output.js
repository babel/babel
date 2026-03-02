var _foo;
var k = Symbol();
var foo = (_foo = {}, _foo[Symbol.iterator] = "foobar", babelHelpers.defineAccessor("get", _foo, k, function () {
  return k;
}), _foo);
