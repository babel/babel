(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(AMD_ARGUMENTS, factory);
  } else if (COMMON_TEST) {
    factory(COMMON_ARGUMENTS);
  } else {
    var mod = { exports: {} };
    factory(mod.exports, BROWSER_ARGUMENTS);
    global[GLOBAL_MODULE_ROOT] = global[GLOBAL_MODULE_ROOT] || {};
    global[GLOBAL_MODULE_ROOT][GLOBAL_MODULE_NAME] = mod.exports;
  }
});
