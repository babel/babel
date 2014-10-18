"use strict";

var arr = function() {
  var _arr = [];

  "abcdefgh".split("").forEach(function(x) {
    "12345678".split("").forEach(function(y) {
      _arr.push(x + y);
    });
  });

  return _arr;
}();