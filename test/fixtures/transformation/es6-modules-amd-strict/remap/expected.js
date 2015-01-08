define(["exports"], function (exports) {
  "use strict";

  var test = exports.test = 2;
  test = exports.test = 5;
  test = exports.test += 1;

  (function () {
    var test = 2;
    test = 3;
    test++;
  })();
});