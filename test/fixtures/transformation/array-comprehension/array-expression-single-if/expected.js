"use strict";

var arr = [1, 2, 3].filter(function (i) {
  return i > 1;
}).map(function (i) {
  return i * i;
});
