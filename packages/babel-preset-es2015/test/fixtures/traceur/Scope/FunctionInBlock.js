(function() {
  'use strict';
  var x = 1;
  {
    function f() {
      x = 2;
    }

    if (false) {}

    f();
  }
  expect(x).toBe(2);
})();
