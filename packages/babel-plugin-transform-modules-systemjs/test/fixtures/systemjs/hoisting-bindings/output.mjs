System.register([], function (_export, _context) {
  "use strict";

  var c;
  function a() {
    alert("a");
    _export("c", +c + 1), c++;
  }
  function b() {
    a();
  }
  _export("a", a);
  return {
    setters: [],
    execute: function () {
      _export("c", c = 5);
      b();
    }
  };
});
