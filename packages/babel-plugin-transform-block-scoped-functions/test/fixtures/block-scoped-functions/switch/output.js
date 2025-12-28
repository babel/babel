var assert = require("assert");
(function () {
  {
    var _a = function a() {
      return v;
    };
    switch (0) {
      case 0:
        assert.equal(_a(), undefined);
        break;
      default:
        assert.equal(_a(), 1);
        var v = 1;
        break;
    }
  }
  function a() {
    return 2;
  }
  assert.equal(a(), 2);
})();
(function () {
  "use strict";

  {
    var _a2 = function a() {
      return v;
    };
    switch (0) {
      case 0:
        assert.equal(_a2(), undefined);
        break;
      default:
        assert.equal(_a2(), 1);
        var v = 1;
        break;
    }
  }
  function a() {
    return 2;
  }
  assert.equal(a(), 2);
})();
