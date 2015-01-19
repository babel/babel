"use strict";

var _to5Runtime = require("6to5-runtime/6to5");

var _core = require("6to5-runtime/core-js");

var _regeneratorRuntime = require("6to5-runtime/regenerator");

var arr = (function () {
  var _arr = [];

  for (var _iterator = _core.$for.getIterator(nums), _step; !(_step = _iterator.next()).done;) {
    var i = _step.value;
    _arr.push(i * i);
  }

  return _arr;
})();
