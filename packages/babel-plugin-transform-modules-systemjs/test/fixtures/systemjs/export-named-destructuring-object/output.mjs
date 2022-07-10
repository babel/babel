System.register([], function (_export, _context) {
  "use strict";

  var bar, baz;
  return {
    setters: [],
    execute: function () {
      ({
        foo: bar,
        baz
      } = {}), _export("baz", baz);
    }
  };
});
