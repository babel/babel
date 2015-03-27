"use strict";

var test = 2;
test = 5;
test++;

(function () {
  var test = 2;
  test = 3;
  test++;
})();
