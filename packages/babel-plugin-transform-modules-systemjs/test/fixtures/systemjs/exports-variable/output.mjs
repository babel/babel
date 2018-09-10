System.register([], function (_export, _context) {
  "use strict";

  var foo, foo2, foo3, foo4, foo5, foo6;

  function foo7() {}

  _export("foo7", foo7);

  _export({
    foo3: void 0,
    foo5: void 0
  });

  return {
    setters: [],
    execute: function () {
      _export("foo", foo = 1);

      _export("foo2", foo2 = function () {});

      _export("foo4", foo4 = 2);

      _export("foo6", foo6 = 3);

      class foo8 {}

      _export("foo8", foo8);

      _export("foo3", foo3 = 5);
    }
  };
});
