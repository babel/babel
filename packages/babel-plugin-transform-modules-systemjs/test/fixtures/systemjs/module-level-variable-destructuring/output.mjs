System.register(["./x.js"], function (_export, _context) {
  "use strict";

  var x, _x;

  return {
    setters: [function (_xJs) {
      x = _xJs.x;
    }],
    execute: function () {
      if (true) {
        ({
          x: _x
        } = {
          x: 1
        });
        console.log(_x);
      }

      new class extends x {}();
    }
  };
});
