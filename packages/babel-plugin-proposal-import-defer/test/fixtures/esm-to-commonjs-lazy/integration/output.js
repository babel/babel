"use strict";

function a() {
  const data = babelHelpers.interopRequireWildcard(require("a"));
  a = () => data;
  return data;
}
var b = babelHelpers.importDeferProxy(() => babelHelpers.interopRequireWildcard(require("b")));
function c() {
  const data = babelHelpers.interopRequireWildcard(require("lazy"));
  c = function () {
    return data;
  };
  return data;
}
later(() => {
  use(a().x, b, c());
});
