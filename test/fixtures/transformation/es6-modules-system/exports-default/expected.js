System.register([], function (_export) {
  _export("default", foo);

  function foo() {}
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

      var Foo = function Foo() {};

      _export("default", Foo);
    }
  };
});
