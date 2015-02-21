"use strict";

// labels

foo: for (var _iterator = foo()[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
  var x = _step.value;

  while (true) {
    if (_iterator["return"]) _iterator["return"]();

    break foo;
  }
}

foo: for (var _iterator2 = foo()[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
  var x = _step2.value;

  while (true) {
    break;
  }
}

foo: for (var _iterator3 = foo()[Symbol.iterator](), _step3; !(_step3 = _iterator3.next()).done;) {
  var x = _step3.value;
  if (_iterator3["return"]) _iterator3["return"]();

  break foo;
}

// basic

for (var _iterator4 = foo()[Symbol.iterator](), _step4; !(_step4 = _iterator4.next()).done;) {
  var x = _step4.value;
  if (_iterator4["return"]) _iterator4["return"]();

  break;
}

for (var _iterator5 = foo()[Symbol.iterator](), _step5; !(_step5 = _iterator5.next()).done;) {
  var x = _step5.value;

  while (true) {
    break;
  }
}
