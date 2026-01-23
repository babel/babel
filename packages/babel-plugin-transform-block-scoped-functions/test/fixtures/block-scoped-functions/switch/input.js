var assert = require("assert");
function nonStrictMode(num) {
  switch (num) {
    case 0:
      assert.equal(a(), undefined);
      break;

    default:
      var v = 1;
      assert.equal(a(), 1);
      function a() {
        return v;
      }
      break;
  }
  function a() {
    return 2;
  }
  assert.equal(a(), 2);
};

function strictMode(num) {
  "use strict";
  switch (num) {
    case 0:
      assert.equal(a(), undefined);
      break;

    default:
      var v = 1;
      assert.equal(a(), 1);
      function a() {
        return v;
      }
      break;
  }
  function a() {
    return 2;
  }
  assert.equal(a(), 2);
};
strictMode(1);
nonStrictMode(1);
strictMode(0);
nonStrictMode(0);
