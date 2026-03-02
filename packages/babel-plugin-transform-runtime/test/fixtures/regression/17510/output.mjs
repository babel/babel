import _regeneratorAsync from "@babel/runtime/helpers/regeneratorAsync";
import _awaitAsyncGenerator from "@babel/runtime/helpers/awaitAsyncGenerator";
function f() {
  var value;
  return _regeneratorAsync(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return _awaitAsyncGenerator(Promise.resolve(1));
      case 1:
        value = _context.v;
        console.log(value);
      case 2:
        return _context.a(2);
    }
  }, null, null, null, Promise);
}
