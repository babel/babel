(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(AMD_ARGUMENTS, factory);
  } else if (typeof exports === 'object') {
    factory(COMMON_ARGUMENTS);
  } else {
    factory(BROWSER_ARGUMENTS);
  }
})(UMD_ROOT, function (FACTORY_PARAMETERS) {
  FACTORY_BODY
});
