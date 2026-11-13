var _marked = /*#__PURE__*/babelHelpers.regenerator().m(gen);
function gen(resource, list) {
  var first, _unused;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        resource, first = list[0];
        for (_unused of list);
        for (resource; false;);
        _context.n = 1;
        return first;
      case 1:
        return _context.a(2);
    }
  }, _marked);
}
function fn(resource) {
  return babelHelpers.regeneratorAsync(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        _context2.n = 1;
        return babelHelpers.awaitAsyncGenerator(resource);
      case 1:
        return _context2.a(2);
    }
  }, null, null, null, Promise);
}
