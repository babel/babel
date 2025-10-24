"use strict";

var _react = require("react");
function Ki(i, n) {
  return i(() => {
    var n;
    return babelHelpers.regeneratorAsync(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          n = function _n() {};
        case 1:
          return _context.a(2);
      }
    }, null, null, null, Promise);
  }, n); // This n is the one from the Ki function, not from the import statement
}
