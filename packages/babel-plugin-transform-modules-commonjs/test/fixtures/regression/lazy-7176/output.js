"use strict";

function mod() {
  const data = babelHelpers.interopRequireWildcard(require("mod"));

  mod = function () {
    return data;
  };

  return data;
}

mod().named;
mod();
