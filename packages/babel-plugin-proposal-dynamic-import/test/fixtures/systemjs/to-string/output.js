System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      (source => new Promise(r => r("" + source)).then(s => _context.import(s)))(2);
    }
  };
});
