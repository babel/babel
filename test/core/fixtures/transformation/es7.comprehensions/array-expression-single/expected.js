"use strict";

var arr = (function () {
  var _arr = [];
  var _arr2 = [1, 2, 3];

  for (var _i = 0; _i < _arr2.length; _i++) {
    var i = _arr2[_i];

    _arr.push(i * i);
  }

  return _arr;
})();
