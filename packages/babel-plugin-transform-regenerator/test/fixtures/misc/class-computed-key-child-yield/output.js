var _marked = /*#__PURE__*/babelHelpers.regenerator().m(gen);
function gen() {
  var _t;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        1;
        _context.n = 1;
        return;
      case 1:
        _t = _context.v;
        1;
        _context.n = 2;
        return;
      case 2:
        return _context.a(2, class {
          [_t]() {
            return 1;
          }
          [_context.v]() {
            return 2;
          }
        });
    }
  }, _marked);
}
const it = gen();
it.next();
it.next("one");
const res = it.next("two").value;
expect(new res().one()).toBe(1);
expect(new res().two()).toBe(2);
