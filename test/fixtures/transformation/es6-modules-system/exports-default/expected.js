System.register([], function (_export) {
  "use strict";

  var Foo;
  _export("default", foo);

  function foo() {}
  return {
    setters: [],
    execute: function () {
      _export("default", 42);

      _export("default", {});

      _export("default", []);

      _export("default", foo);

      _export("default", function () {});

      _export("default", function () {});

      Foo = undefined;
      _export("default", Foo = function Foo() {});
    }
  };
});
