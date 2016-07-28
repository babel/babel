System.register([], function (_export, _context) {
  "use strict";

  function foo() {}

  _export("foo", foo);

  function foo2(bar) {}

  _export("foo2", foo2);

  return {
    setters: [],
    execute: function () {
      _export("foo", foo);

      _export("foo", foo);

      _export("bar", bar);

      _export("bar", foo);

      _export("default", foo);

      _export("default", foo);

      _export("bar", bar);
    }
  };
});
