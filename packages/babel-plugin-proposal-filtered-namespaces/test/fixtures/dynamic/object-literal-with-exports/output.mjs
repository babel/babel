var _exports, _exports2, _exports3;
import("x", {
  exports: _exports = ["a"]
}).then(babelHelpers.createModuleNsFilter(_exports));
import("x", {
  "exports": _exports2 = ["a"]
}).then(babelHelpers.createModuleNsFilter(_exports2));
import("x", {
  ["exports"]: _exports3 = ["a"]
}).then(babelHelpers.createModuleNsFilter(_exports3));
babelHelpers.filterModuleNamespace(_extractExports => import("x", _extractExports({
  [key]: ["a"]
})));
babelHelpers.filterModuleNamespace(_extractExports2 => import("x", _extractExports2({
  ...opts
})));
babelHelpers.filterModuleNamespace(_extractExports3 => import("x", _extractExports3({
  get exports() {
    return ["a"];
  }
})));
