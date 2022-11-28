var _foo;
var k = Symbol();
var foo = (_foo = {}, babelHelpers.defineProperty(_foo, Symbol.iterator, "foobar"), babelHelpers.defineAccessor(_foo, k, "get", function () {
  return k;
}), _foo);
