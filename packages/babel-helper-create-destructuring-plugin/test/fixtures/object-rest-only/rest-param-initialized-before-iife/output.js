const _excluded = ["a"];
function f(_ref) {
  let {
      a
    } = _ref,
    b = babelHelpers.objectWithoutProperties(_ref, _excluded);
  let c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : g();
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return function (args) {
    var args = args.concat(1);
    return args;
  }(args);
}
function h(_ref2) {
  let i = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []);
  let j = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id(() => k);
  for (var _len2 = arguments.length, k = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    k[_key2 - 2] = arguments[_key2];
  }
  return function (k) {
    var k = [];
    return j();
  }(k);
}
function gen(_ref3) {
  let l = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref3), _ref3)), []);
  let n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : g();
  for (var _len3 = arguments.length, m = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    m[_key3 - 2] = arguments[_key3];
  }
  return function* () {
    yield [n, m];
  }();
}
