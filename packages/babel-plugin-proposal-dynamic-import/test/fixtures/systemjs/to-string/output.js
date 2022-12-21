System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      (specifier => new Promise(r => r(`${specifier}`)).then(s => _context.import(s)))(2);
    }
  };
});
