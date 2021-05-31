var _foo, _mutatorMap;

var k = Symbol();
var foo = (_foo = {}, _foo[Symbol.iterator] = "foobar", _mutatorMap = {}, _mutatorMap[k] = _mutatorMap[k] || {}, _mutatorMap[k].get = function () {
  return k;
}, babelHelpers.defineEnumerableProperties(_foo, _mutatorMap), _foo);
