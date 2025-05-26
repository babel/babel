import _regenerator from "@babel/runtime-corejs3/helpers/regenerator";
var _marked = /*#__PURE__*/_regenerator().m(giveWord);
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import foo, * as bar from "someModule";
export const myWord = _Symbol("abc");
export function giveWord() {
  return _regenerator().w(function (_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return myWord;
      case 2:
        return _context.a(2);
    }
  }, _marked);
}
foo;
bar;
