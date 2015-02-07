"use strict";

(function f(n) {
  if (n <= 0) {
    console.log(this, arguments);
    return "foo";
  }
  if (Math.random() > 0.5) {
    return to5Runtime.tailCall(f.call, [this, n - 1], f);
  } else {
    return to5Runtime.tailCall(f.apply, [this, [n - 1]], f);
  }
})(1000000) === "foo";
