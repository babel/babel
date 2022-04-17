function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return method.call(iterable); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

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
                  _context.next = 14;
                  break;
                }

                _context.next = 9;
                return regeneratorRuntime.awrap(_step.value);

              case 9:
                string = _context.sent;
                // for await: required for babel to crash
                console.log(string);

              case 11:
                _iteratorAbruptCompletion = false;
                _context.next = 4;
                break;

              case 14:
                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](2);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 20:
                _context.prev = 20;
                _context.prev = 21;

                if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
                  _context.next = 25;
                  break;
                }

                _context.next = 25;
                return regeneratorRuntime.awrap(_iterator.return());

              case 25:
                _context.prev = 25;

                if (!_didIteratorError) {
                  _context.next = 28;
                  break;
                }

                throw _iteratorError;

              case 28:
                return _context.finish(25);

              case 29:
                return _context.finish(20);

              case 30:
              case "end":
                return _context.stop();
            }
          }, null, null, [[2, 16, 20, 30], [21,, 25, 29]], Promise);
        };

        one = 1; // array destructuring: required for babel to crash

      case 2:
      case "end":
        return _context2.stop();
    }
  }, null, null, null, Promise);
}
