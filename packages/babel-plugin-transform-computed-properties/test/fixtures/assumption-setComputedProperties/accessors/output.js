var _foobar, _foobar2, _test, _test2, _obj, _mutatorMap;

var obj = (_obj = {}, _foobar = foobar, _mutatorMap = {}, _mutatorMap[_foobar] = _mutatorMap[_foobar] || {}, _mutatorMap[_foobar].get = function () {
  return "foobar";
}, _foobar2 = foobar, _mutatorMap[_foobar2] = _mutatorMap[_foobar2] || {}, _mutatorMap[_foobar2].set = function (x) {
  console.log(x);
}, _test = "test", _mutatorMap[_test] = _mutatorMap[_test] || {}, _mutatorMap[_test].get = function () {
  return "regular getter after computed property";
}, _test2 = "test", _mutatorMap[_test2] = _mutatorMap[_test2] || {}, _mutatorMap[_test2].set = function (x) {
  console.log(x);
}, babelHelpers.defineEnumerableProperties(_obj, _mutatorMap), _obj);
