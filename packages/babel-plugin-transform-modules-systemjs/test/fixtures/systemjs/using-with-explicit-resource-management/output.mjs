System.register([], function (_export, _context) {
  "use strict";

  var _usingCtx, x, y;
  function f() {
    return y;
  }
  _export("f", f);
  return {
    setters: [],
    execute: async function () {
      try {
        _usingCtx = babelHelpers.usingCtx();
        _export("x", x = _usingCtx.u(foo()));
        y = _usingCtx.a(bar());
      } catch (_) {
        _usingCtx.e = _;
      } finally {
        await _usingCtx.d();
      }
    }
  };
});
