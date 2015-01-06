(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(AMD_ARGUMENTS, factory);
  } else if (COMMON_TEST) {
    factory(COMMON_ARGUMENTS);
  }
});
