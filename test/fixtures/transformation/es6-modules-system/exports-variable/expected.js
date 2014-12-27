System.register("es6-modules-system/exports-variable/expected", [], function (_export) {
  return {
    setters: [],
    execute: function () {
      "use strict";

      _export("foo7", foo7);

      var foo = _export("foo", 1);
      var foo2 = _export("foo2", function () {});
      var foo3 = _export("foo3", undefined);
      var foo4 = _export("foo4", 2);
      var foo5 = _export("foo5", undefined);
      var foo6 = _export("foo6", 3);
      function foo7() {}
      var foo8 = function foo8() {};

      _export("foo8", foo8);
    }
  };
});