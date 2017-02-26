"use strict";

var _loop = function _loop(i) {
  var l = i;
  setTimeout(function () {
    console.log(l);
  }, 1);
};

for (var i = 0; i < 5; i++) {
  _loop(i);
}
