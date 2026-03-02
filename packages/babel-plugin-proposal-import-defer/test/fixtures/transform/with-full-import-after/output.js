"use strict";

var y = babelHelpers.interopRequireWildcard(require("y"));
var x2 = babelHelpers.interopRequireWildcard(require("x"));
var x1 = x2;
later(() => {
  use(x1, x2, y);
});
