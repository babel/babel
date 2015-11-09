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
  assert.equal(2, x);
})();
