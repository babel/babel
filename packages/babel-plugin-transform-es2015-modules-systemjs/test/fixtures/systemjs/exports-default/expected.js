"use strict";

System.register([], function (_export, __moduleName) {
  _export("default", function () {});

  _export("default", class {});

  function foo() {}

  _export("default", foo);

  return {
    setters: [],
    execute: function () {
      _export("default", 42);

      _export("default", {});

      _export("default", []);

      _export("default", foo);

      class Foo {}

      _export("default", Foo);

      _export("default", (function () {
        return "foo";
      })());
    }
  };
});