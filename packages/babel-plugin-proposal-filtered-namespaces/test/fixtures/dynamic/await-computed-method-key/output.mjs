async function f() {
  var _specifier, _options, _specifier2, _options2, _specifier3, _options3;
  await (_specifier = s, _options = {
    [await key()]() {}
  }, babelHelpers.filterModuleNamespace(_extractExports => import(_specifier, _extractExports(_options))));
  await (_specifier2 = s, _options2 = {
    async [await key()]() {
      await x;
    }
  }, babelHelpers.filterModuleNamespace(_extractExports2 => import(_specifier2, _extractExports2(_options2))));
  await (_specifier3 = s, _options3 = {
    get [await key()]() {}
  }, babelHelpers.filterModuleNamespace(_extractExports3 => import(_specifier3, _extractExports3(_options3))));
}
function* g() {
  var _specifier4, _options4;
  yield (_specifier4 = s, _options4 = {
    [yield]() {}
  }, babelHelpers.filterModuleNamespace(_extractExports4 => import(_specifier4, _extractExports4(_options4))));
}
