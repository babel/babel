"use strict";

var x1 = babelHelpers.interopRequireWildcard(require("x"));
var x2 = x1;
var y = babelHelpers.interopRequireWildcard(require("y"));
later(() => {
  use(x1, x2, y);
});
