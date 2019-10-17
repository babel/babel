var Example =
/*#__PURE__*/
function () {
  "use strict";

  function Example() {}

  var _proto = Example.prototype;

  _proto.test1 = function test1() {
    return regeneratorRuntime.async(function test1$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Promise.resolve(2));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  _proto.test2 =
  /*#__PURE__*/
  regeneratorRuntime.mark(function test2() {
    return regeneratorRuntime.wrap(function test2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return 3;

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, test2);
  });
  return Example;
}();
