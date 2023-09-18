"use strict";

var ns = babelHelpers.importDeferProxy(() => babelHelpers.interopRequireWildcard(require("x")));
later(() => {
  use(ns);
});
