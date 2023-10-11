"use strict";

var ns = babelHelpers.importDeferProxy(() => babelHelpers.interopRequireWildcard(require("x")));
later(() => {
  ns.prop;
  use(ns);
});
