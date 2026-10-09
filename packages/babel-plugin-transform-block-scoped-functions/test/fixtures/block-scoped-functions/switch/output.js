var assert = require("assert");
function nonStrictMode(num) {
  {
    var _a = function a() {
      return v;
    };
    switch (num) {
      case 0:
        assert.equal(_a(), undefined);
        break;
      default:
        var v = 1;
        assert.equal(_a(), 1);
        break;
    }
  }
  function a() {
    return 2;
  }
  assert.equal(a(), 2);
}
;
function strictMode(num) {
  "use strict";

  {
    var _a2 = function a() {
      return v;
    };
    switch (num) {
      case 0:
        assert.equal(_a2(), undefined);
        break;
      default:
        var v = 1;
        assert.equal(_a2(), 1);
        break;
    }
  }
  function a() {
    return 2;
  }
  assert.equal(a(), 2);
}
;
strictMode(1);
nonStrictMode(1);
strictMode(0);
nonStrictMode(0);
