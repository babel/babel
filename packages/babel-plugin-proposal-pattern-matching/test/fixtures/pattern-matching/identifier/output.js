"use strict";

var arr = [1, 2, 3];
assert.equal(match(arr, $, arr => "array", {
  name: [$]
}, ({
  name: [var1]
}) => "error"), "array");
