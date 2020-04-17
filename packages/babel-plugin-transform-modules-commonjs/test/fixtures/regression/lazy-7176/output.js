"use strict";

function mod() {
  const data = babelHelpers.interopRequireDefault(require("mod"));

  mod = function () {
    return data;
  };

  return data;
}

mod().named;
mod();
