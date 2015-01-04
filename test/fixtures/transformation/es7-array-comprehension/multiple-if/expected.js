"use strict";

var seattlers = (function () {
  var _seattlers = [];

  for (var _iterator = countries[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
    var customers = _step.value;
    for (var _iterator2 = customers[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
      var _c = _step2.value;
      if (_c.city == "Seattle") {
        _seattlers.push({ name: _c.name, age: _c.age });
      }
    }
  }

  return _seattlers;
})();
