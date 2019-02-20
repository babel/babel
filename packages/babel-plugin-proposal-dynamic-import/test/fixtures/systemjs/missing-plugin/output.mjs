System.register(["a"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_a) {}],
    execute: function () {
      // TODO: This should throw in Babel 8
      _context.import("b");
    }
  };
});
