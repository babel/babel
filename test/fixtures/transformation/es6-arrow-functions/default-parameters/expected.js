"use strict";

var some = function some() {
  var count = arguments[0] === undefined ? "30" : arguments[0];

  console.log("count", count);
};

some();
