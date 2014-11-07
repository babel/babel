"use strict";

var seattlers = (function () {
  var _arr = [];

  for (var _iterator = countries[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
    var customers = _step.value;

    for (var _iterator2 = customers[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
      var c = _step2.value;

      if (c.city == "Seattle") {
        _arr.push({ name: c.name, age: c.age });
      }
    }
  }

  return _arr;
})();
