System.register([], function (_export) {
  var test;
  return {
    setters: [],
    execute: function () {
      "use strict";

      test = 2;

      _export("test", test);

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