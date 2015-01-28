System.register([], function (_export) {
  "use strict";

  var _default, Foo;
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

      _default = function _default() {};

      _export("default", _default);

      Foo = function Foo() {};

      _export("default", Foo);
    }
  };
});