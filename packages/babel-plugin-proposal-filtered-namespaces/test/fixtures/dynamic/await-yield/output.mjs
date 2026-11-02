async function f() {
  var _specifier, _options, _specifier2, _options2;
  await (_specifier = await getSpecifier(), _options = opts, babelHelpers.filterModuleNamespace(_extractExports => import(_specifier, _extractExports(_options))));
  await (_specifier2 = specifier, _options2 = {
    exports: await getExports()
  }, babelHelpers.filterModuleNamespace(_extractExports2 => import(_specifier2, _extractExports2(_options2))));
}
function* g() {
  var _specifier3, _options3;
  yield (_specifier3 = yield, _options3 = opts, babelHelpers.filterModuleNamespace(_extractExports3 => import(_specifier3, _extractExports3(_options3))));
}
async function h() {
  await babelHelpers.filterModuleNamespace(_extractExports4 => import(specifier, _extractExports4({
    exports: (async () => await getExports())()
  })));
}
