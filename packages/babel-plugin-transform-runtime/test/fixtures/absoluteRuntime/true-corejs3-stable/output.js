var _mapInstanceProperty = require("<CWD>/packages/babel-runtime-corejs3/core-js-stable/instance/map.js");
var _marked = /*#__PURE__*/babelHelpers.regenerator().m(makeIterator);
_mapInstanceProperty(Array);
function makeIterator() {
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.p = _context.next) {
      case 0:
        _context.next = 2;
        return 1;
      case 2:
        _context.next = 4;
        return 2;
      case 4:
        return _context.a(2);
    }
  }, _marked);
}
var _iterator = babelHelpers.createForOfIteratorHelper(makeIterator()),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var itItem = _step.value;
    console.log(itItem);
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
