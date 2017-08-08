System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      const {
        foo: {
          bar: [baz, qux]
        }
      } = {};

      _export("baz", baz);

      _export("qux", qux);
    }
  };
});
