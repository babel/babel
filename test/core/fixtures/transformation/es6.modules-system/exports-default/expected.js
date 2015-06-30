System.register([], function (_export) {
  "use strict";

  var _default, Foo;

  _export("default", foo);

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function foo() {}

  return {
    setters: [],
    execute: function () {
      _export("default", 42);

      _export("default", {});

      _export("default", []);

      _export("default", foo);

      _export("default", function () {});

      _default = function _default() {
        _classCallCheck(this, _default);
      };

      _export("default", _default);

      Foo = function Foo() {
        _classCallCheck(this, Foo);
      };

      _export("default", Foo);

      _export("default", (function () {
        return "foo";
      })());
    }
  };
});