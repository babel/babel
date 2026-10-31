var _exports;
// Custom prototypes
babelHelpers.filterModuleNamespace(_extractExports => import("x", _extractExports({
  __proto__: {
    exports: ["a"]
  }
})));
babelHelpers.filterModuleNamespace(_extractExports2 => import("x", _extractExports2({
  "__proto__": {
    exports: ["a"]
  }
})));

// This has a custom prototype, but we statically extract `exports` anyway.
import("x", {
  __proto__: null,
  exports: _exports = ["a"]
}).then(babelHelpers.createModuleNsFilter(_exports));

// This is technically just a __proto__ property, but it's not worth
// making the transform logic more complex to exclude this case. The
// runtime helper will do the right thing anyway.
babelHelpers.filterModuleNamespace(_extractExports3 => import("x", _extractExports3({
  ["__proto__"]: {
    exports: ["a"]
  }
})));
