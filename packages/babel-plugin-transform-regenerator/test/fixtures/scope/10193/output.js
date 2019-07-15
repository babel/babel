"use strict";

var _actions = require("actions");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(foo);

function foo() {
  var someAction;
  return regeneratorRuntime.wrap(function foo$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _actions.someAction = (bar, function () {
          throw new Error('"' + "someAction" + '" is read-only.');
        }());

      case 1:
      case "end":
        return _context.stop();
    }
  }, _marked);
}
