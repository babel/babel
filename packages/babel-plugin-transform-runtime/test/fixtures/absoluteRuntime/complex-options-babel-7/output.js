var _asyncToGenerator = require("<CWD>/packages/babel-runtime/helpers/asyncToGenerator.js");
function test() {
  return _test.apply(this, arguments);
}
function _test() {
  _test = _asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('test');
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _test.apply(this, arguments);
}
function main() {
  return _main.apply(this, arguments);
}
function _main() {
  _main = _asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var _t, _t2;
    return regeneratorRuntime.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _t = console;
          _context2.next = 1;
          return test();
        case 1:
          _t2 = _context2.sent;
          _t.log.call(_t, _t2);
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _main.apply(this, arguments);
}
main();
