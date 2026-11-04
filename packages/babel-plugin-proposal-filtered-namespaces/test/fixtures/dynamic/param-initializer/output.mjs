var _exports, _exports2;
function f(ns = import("x", {
  exports: _exports = ["a"]
}).then(babelHelpers.createModuleNsFilter(_exports))) {}
const g = (ns = import("x", {
  exports: _exports2 = ["a"]
}).then(babelHelpers.createModuleNsFilter(_exports2))) => {};
function h(ns = babelHelpers.filterModuleNamespace(_extractExports => import("x", _extractExports({
  exports
})))) {}
function outer() {
  var _exports3;
  function f(ns = import("x", {
    exports: _exports3 = ["a"]
  }).then(babelHelpers.createModuleNsFilter(_exports3))) {
    return ns;
  }
}
