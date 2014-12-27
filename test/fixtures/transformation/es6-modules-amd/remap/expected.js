define(["exports"], function (exports) {
  "use strict";

  var test = exports.test = 2;
  test = 5;

  (function () {
    var test = 2;
    test = 3;
  })();
});
