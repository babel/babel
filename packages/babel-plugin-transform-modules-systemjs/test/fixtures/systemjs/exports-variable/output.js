System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      var foo = 1;

      _export("foo", foo);

      var foo2 = function () {};

      _export("foo2", foo2);

      var foo3;

      _export("foo3", foo3);

      let foo4 = 2;

      _export("foo4", foo4);

      let foo5;

      _export("foo5", foo5);

      const foo6 = 3;

      _export("foo6", foo6);

      function foo7() {}

      _export("foo7", foo7);

      class foo8 {}

      _export("foo8", foo8);

      _export("foo3", foo3 = 5);
    }
  };
});
