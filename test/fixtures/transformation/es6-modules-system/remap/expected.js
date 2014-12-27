System.register("es6-modules-system/remap/expected", [], function (_export) {
  return {
    setters: [],
    execute: function () {
      "use strict";

      var test = _export("test", 2);
      test = 5;

      (function () {
        var test = 2;
        test = 3;
      })();
    }
  };
});