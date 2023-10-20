var k = Symbol();
var foo = babelHelpers.defineAccessor("get", babelHelpers.defineProperty({}, Symbol.iterator, "foobar"), k, function () {
  return k;
});
