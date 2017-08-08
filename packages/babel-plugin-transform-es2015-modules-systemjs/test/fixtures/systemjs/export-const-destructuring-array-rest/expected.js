System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      const [foo, bar, ...baz] = [];

      _export("foo", foo);

      _export("bar", bar);

      _export("baz", baz);
    }
  };
});
