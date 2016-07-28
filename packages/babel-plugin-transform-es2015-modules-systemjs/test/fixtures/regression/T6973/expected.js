System.register([], function (_export, _context) {
  "use strict";

  function a() {
    alert("a");
  }

  _export("a", a);

  function b() {
    a();
  }

  return {
    setters: [],
    execute: function () {
      b();
    }
  };
});
