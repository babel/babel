System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      (specifier => new Promise(r => r(_context.import(`${specifier}`))))(2);
    }
  };
});
