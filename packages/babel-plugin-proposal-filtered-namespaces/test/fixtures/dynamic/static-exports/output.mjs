var _exports, _exports2, _exports3;
import("x", {
  exports: _exports = ["B", "a", "a", "b"]
}).then(babelHelpers.createModuleNsFilter(_exports));
import("x", {
  with: {
    type: "json"
  },
  "exports": _exports2 = []
}).then(babelHelpers.createModuleNsFilter(_exports2));
import("x", {
  ["exports"]: _exports3 = ["c"],
  with: sideEffect()
}).then(babelHelpers.createModuleNsFilter(_exports3));

// Not statically known
babelHelpers.filterModuleNamespace(_extractExports => import("x", _extractExports({
  exports: ["a", b]
})));
babelHelpers.filterModuleNamespace(_extractExports2 => import("x", _extractExports2({
  exports: ["a"],
  exports: ["b"]
})));
babelHelpers.filterModuleNamespace(_extractExports3 => import("x", _extractExports3({
  exports
})));
babelHelpers.filterModuleNamespace(_extractExports4 => import("x", _extractExports4({
  exports: [...names]
})));
babelHelpers.filterModuleNamespace(_extractExports5 => import("x", _extractExports5({
  exports: ["a"],
  ...rest
})));
