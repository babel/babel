(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("es6.modules-umd/module-name/expected", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.es6ModulesUmdModuleNameExpected = mod.exports;
  }
})(this, function () {
  foobar();
});
