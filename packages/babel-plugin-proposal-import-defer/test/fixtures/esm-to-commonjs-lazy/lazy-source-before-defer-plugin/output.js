"use strict";

function a(data) {
  a = () => data;
  return data = babelHelpers.interopRequireWildcard(require("a"));
}
var c = babelHelpers.importDeferProxy(() => babelHelpers.interopRequireWildcard(require("c")));
function b() {
  const data = babelHelpers.interopRequireWildcard(require("b"));
  b = function () {
    return data;
  };
  return data;
}
later(() => {
  use(a().x, b(), c);
});
