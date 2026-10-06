System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      sideEffect(), _context.import("a");
      (specifier => new Promise(r => r(_context.import(`${specifier}`))))(getSpecifier(), sideEffect());
    }
  };
});
