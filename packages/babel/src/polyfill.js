if (global._babelPolyfill) {
  throw new Error("uh, um– I CAN'T TRANSPILE UNDER ALL THIS PRESSURE!!!");
}
global._babelPolyfill = true;

import "core-js/shim";
import "regenerator/runtime";
