"use strict";

function ns() {
  const data = babelHelpers.interopRequireWildcard(require("x"));
  ns = () => data;
  return data;
}
later(() => {
  ns().prop;
});
