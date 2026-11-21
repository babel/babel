"use strict";

var ns = babelHelpers.importDeferProxy(() => babelHelpers.interopRequireWildcard(require("x")));
later(() => {
  ns.then;
  ns.prop;
});
