function v() {
  return _v.apply(this, arguments);
}
function _v() {
  _v = babelHelpers.asyncToGenerator( /*#__PURE__*/babelHelpers.regeneratorRuntime().mark(function _callee() {
    var source,
      _iteratorAbruptCompletion,
      _didIteratorError,
      _iteratorError,
      _iterator,
      _step,
      _args = arguments;
    return babelHelpers.regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            source = _args.length > 0 && _args[0] !== undefined ? _args[0] : 2;
            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context.prev = 3;
            _iterator = babelHelpers.asyncIterator([1]);
          case 5:
            _context.next = 7;
            return _iterator.next();
          case 7:
            if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
              _context.next = 12;
              break;
            }
            source = _step.value;
          case 9:
            _iteratorAbruptCompletion = false;
            _context.next = 5;
            break;
          case 12:
            _context.next = 18;
            break;
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;
          case 18:
            _context.prev = 18;
            _context.prev = 19;
            if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
              _context.next = 23;
              break;
            }
            _context.next = 23;
            return _iterator.return();
          case 23:
            _context.prev = 23;
            if (!_didIteratorError) {
              _context.next = 26;
              break;
            }
            throw _iteratorError;
          case 26:
            return _context.finish(23);
          case 27:
            return _context.finish(18);
          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 14, 18, 28], [19,, 23, 27]]);
  }));
  return _v.apply(this, arguments);
}
