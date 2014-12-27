System.register("es6-modules-system/remap/expected", [], function (_export) {
  return {
    setters: [],
    execute: function () {
      "use strict";

      var test = _export("test", 2);
      _export("test", test = 5);
      _export("test", test += 1);

      (function () {
        var test = 2;
        test = 3;
        test++;
      })();
    }
  };
});
