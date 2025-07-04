var replay = /*#__PURE__*/function () {
  var _ref = babelHelpers.asyncToGenerator(/*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
    var _t;
    return babelHelpers.regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _context.n = 2;
          break;
        case 1:
          _context.p = 1;
          _t = _context.v;
          return _context.a(2, false);
        case 2:
          throw new Error('@kira throw');
        case 3:
          return _context.a(2);
      }
    }, _callee, null, [[0, 1]]);
  }));
  return function replay() {
    return _ref.apply(this, arguments);
  };
}();
return expect(function () {
  return replay();
}).rejects.toThrow('@kira throw');
