System.register([], function (_export) {
  var _classCallCheck, _default, Foo;

  _export("default", foo);

  function foo() {}

  return {
    setters: [],
    execute: function () {
      "use strict";

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      _export("default", 42);

      _export("default", {});

      _export("default", []);

      _export("default", foo);

      _export("default", function () {});

      _default = (function () {
        var _class = function _default() {
          _classCallCheck(this, _class);
        };

        return _class;
      })();

      _export("default", _default);

      Foo = function Foo() {
        _classCallCheck(this, Foo);
      };

      _export("default", Foo);
    }
  };
});
