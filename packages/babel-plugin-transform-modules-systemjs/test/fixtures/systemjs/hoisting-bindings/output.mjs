System.register([], function (_export, _context) {
  "use strict";

  var c;

  function a() {
    var _c;

    alert("a");
    _export("c", _c = c++), _c;
  }

  _export("a", a);

  function b() {
    a();
  }

  return {
    setters: [],
    execute: function () {
      _export("c", c = 5);

      _export("c", c);

      b();
    }
  };
});
