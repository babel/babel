var _regenerator = require("<CWD>/packages/babel-runtime/helpers/regenerator.js")["default"];
var _asyncToGenerator = require("<CWD>/packages/babel-runtime/helpers/asyncToGenerator.js")["default"];
function test() {
  return _test.apply(this, arguments);
}
function _test() {
  _test = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('test');
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _test.apply(this, arguments);
}
function main() {
  return _main.apply(this, arguments);
}
function _main() {
  _main = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var _t, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _t = console;
          _context2.next = 3;
          return test();
        case 3:
          _t2 = _context2.v;
          _t.log.call(_t, _t2);
        case 5:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _main.apply(this, arguments);
}
main();
