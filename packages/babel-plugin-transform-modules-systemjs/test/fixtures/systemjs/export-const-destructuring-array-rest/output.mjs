System.register([], function (_export, _context) {
  "use strict";

  var foo, bar, baz;
  return {
    setters: [],
    execute: function () {
      [foo, bar, ...baz] = [], _export("foo", foo), _export("bar", bar), _export("baz", baz);
    }
  };
});
