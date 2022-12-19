System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      new Promise(r => r(`${2}`)).then(s => _context.import(s));
    }
  };
});
