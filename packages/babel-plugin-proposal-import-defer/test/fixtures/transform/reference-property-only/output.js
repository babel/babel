"use strict";

function ns(data) {
  ns = () => data;
  return data = babelHelpers.interopRequireWildcard(require("x"));
}
later(() => {
  ns().prop;
});
