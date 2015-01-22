"use strict";

if (global._6to5Polyfill) {
  throw new Error("only one instance of 6to5/polyfill is allowed");
}
global._6to5Polyfill = true;

require("core-js/shim");
require("regenerator-6to5/runtime");
