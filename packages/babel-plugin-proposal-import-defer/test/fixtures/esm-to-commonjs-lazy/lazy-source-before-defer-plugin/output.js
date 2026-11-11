"use strict";

function a(data) {
  a = () => data;
  return data = babelHelpers.interopRequireWildcard(require("a"));
}
function b() {
  const data = babelHelpers.interopRequireWildcard(require("b"));
  b = function () {
    return data;
  };
  return data;
}
later(() => {
  use(a().x, b());
});
