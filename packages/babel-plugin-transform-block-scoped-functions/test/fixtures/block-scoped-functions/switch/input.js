var assert = require("assert");
(function () {
  switch (0) {
    case 0:
      assert.equal(a(), undefined);
      break;

    default:
      assert.equal(a(), 1);
      var v = 1;
      function a() {
        return v;
      }
      break;
  }
  function a() {
    return 2;
  }
  assert.equal(a(), 2);
})();

(function () {
  "use strict";
  switch (0) {
    case 0:
      assert.equal(a(), undefined);
      break;

    default:
      assert.equal(a(), 1);
      var v = 1;
      function a() {
        return v;
      }
      break;
  }
  function a() {
    return 2;
  }
  assert.equal(a(), 2);
})();
