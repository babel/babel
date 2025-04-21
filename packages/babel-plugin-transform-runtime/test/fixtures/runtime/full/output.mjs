import _regenerator from "@babel/runtime/helpers/regenerator";
var _marked = /*#__PURE__*/_regenerator().m(giveWord);
import foo, * as bar from "someModule";
export const myWord = Symbol("abc");
export function giveWord() {
  return _regenerator().w(function giveWord$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return myWord;
      case 2:
        return _context.stop();
    }
  }, _marked);
}
foo;
bar;
