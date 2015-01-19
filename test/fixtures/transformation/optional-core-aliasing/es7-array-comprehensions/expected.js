"use strict";

var _core = require("core-js/library");

var arr = (function () {
  var _arr = [];

  for (var _iterator = _core.$for.getIterator(nums), _step; !(_step = _iterator.next()).done;) {
    var i = _step.value;
    _arr.push(i * i);
  }

  return _arr;
})();
