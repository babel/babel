System.register(["./x.js"], function (_export, _context) {
  "use strict";

  var x;
  return {
    setters: [function (_xJs) {
      x = _xJs.x;
    }],
    execute: function () {
      if (true) {
        const {
          x
        } = {
          x: 1
        };
        console.log(x);
      }
      new class extends x {}();
    }
  };
});
