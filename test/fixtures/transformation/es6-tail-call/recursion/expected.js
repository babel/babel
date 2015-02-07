"use strict";

(function f(_x, /* should be undefined after first pass */m) {
  var n = arguments[0] === undefined ? getDefaultValue() : arguments[0];
  if (n <= 0) {
    return "foo";
  }
  // Should be clean (undefined) on each pass
  var local;
  return to5Runtime.tailCall(f, [n - 1]);
})(1000000, true) === "foo";
