async function f() {
  await babelHelpers.filterModuleNamespace(_extractExports => import(s, _extractExports({
    [await key()]() {}
  })));
  await babelHelpers.filterModuleNamespace(_extractExports2 => import(s, _extractExports2({
    async [await key()]() {
      await x;
    }
  })));
  await babelHelpers.filterModuleNamespace(_extractExports3 => import(s, _extractExports3({
    get [await key()]() {}
  })));
}
function* g() {
  yield babelHelpers.filterModuleNamespace(_extractExports4 => import(s, _extractExports4({
    [yield]() {}
  })));
}
