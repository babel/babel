System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      import.source("a");
      import.defer("b");
      import.sync("d");
      _context.import("c");
    }
  };
});
