"use strict";

var arr = Array.from(nums).filter(function (i) {
  return i > 1;
}).map(function (i) {
  return i * i;
});
