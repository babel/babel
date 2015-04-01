(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(AMD_ARGUMENTS, factory);
  } else if (COMMON_TEST) {
    factory(COMMON_ARGUMENTS);
  } else {
    var module = { exports: {} };
    factory(BROWSER_ARGUMENTS);
    global.GLOBAL_ARG = module.exports;
  }
});
