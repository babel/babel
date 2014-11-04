"use strict";

function foo(n) {
  var bar = n;
  eval("console.log(bar)");
}

foo(42);

