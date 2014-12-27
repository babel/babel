System.register("es6-modules-system/exports-default/expected", [], function (_export) {
  return {
    setters: [],
    execute: function () {
      "use strict";

      _export("default", 42);

      _export("default", {});

      _export("default", []);

      _export("default", foo);

      _export("default", function () {});

      _export("default", function () {});

      function foo() {}
      _export("default", foo);

      var Foo = function Foo() {};

      _export("default", Foo);
    }
  };
});