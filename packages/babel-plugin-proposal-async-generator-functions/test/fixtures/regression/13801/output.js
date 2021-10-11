function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) method = iterable[Symbol.asyncIterator]; if (method == null && Symbol.iterator) method = iterable[Symbol.iterator]; } if (method == null) method = iterable["@@asyncIterator"]; if (method == null) method = iterable["@@iterator"]; if (method == null) throw new TypeError("Object is not async iterable"); return method.call(iterable); }

function main() {
  var one;
  return regeneratorRuntime.async(function main$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        () => {
          var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, string;

          return regeneratorRuntime.async(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                // IIFE: required for babel to crash
                _iteratorAbruptCompletion = false;
                _didIteratorError = false;
                _context.prev = 2;
                _iterator = _asyncIterator(async_iterable);

              case 4:
                _context.next = 6;
                return regeneratorRuntime.awrap(_iterator.next());

              case 6:
                if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
                  _context.next = 12;
                  break;
                }

                string = _step.value;
                // for await: required for babel to crash
                console.log(string);

              case 9:
                _iteratorAbruptCompletion = false;
                _context.next = 4;
                break;

              case 12:
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](2);
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
                return regeneratorRuntime.awrap(_iterator.return());

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
          }, null, null, [[2, 14, 18, 28], [19,, 23, 27]], Promise);
        };

        one = 1; // array destructuring: required for babel to crash

      case 2:
      case "end":
        return _context2.stop();
    }
  }, null, null, null, Promise);
}
