System.register([], function (_export, _context) {
  "use strict";

  var baz, qux;
  return {
    setters: [],
    execute: function () {
      ({
        foo: {
          bar: [baz, qux]
        }
      } = {}), _export("baz", baz), _export("qux", qux);
    }
  };
});
