"use strict";

var arr = [];
for (var i = 0; i < 10; i++) {
  for (var _i = 0; _i < 10; _i++) {
    (function (_i) {
      arr.push(function () {
        return _i;
      });
    })(_i);
  }
}
