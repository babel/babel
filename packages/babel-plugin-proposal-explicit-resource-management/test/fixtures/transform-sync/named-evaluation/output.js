let log = [];
let Symbol$dispose = Symbol.dispose || Symbol.for("Symbol.dispose");
try {
  var _m;
  var _usingCtx = babelHelpers.usingCtx();
  const foo = _usingCtx.u((_m = class {
    static [Symbol$dispose]() {
      log.push(`${foo.name} is disposed`);
    }
  }, babelHelpers.setFunctionName(_m, "foo")));
  log.push(foo.name);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
