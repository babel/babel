import _regenerator from "@babel/runtime/helpers/regenerator";
var _marked = /*#__PURE__*/_regenerator().m(giveWord);
import foo, * as bar from "someModule";
export const myWord = Symbol("abc");
export function giveWord() {
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return myWord;
      case 1:
        return _context.a(2);
    }
  }, _marked);
}
foo;
bar;
