"use strict";

if (true) {
  var x;

  (function () {
    var foo = function foo() {};

    var bar = function bar() {
      return foo;
    };

    for (x in {}) {}
  })();
}
