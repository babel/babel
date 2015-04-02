System.register([], function (_export) {
  var test, a, b;
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

      a = 2;

      _export("a", a);

      _export("a", a = 3);

      b = 2;

      _export("c", b);

      _export("c", b = 3);
    }
  };
});