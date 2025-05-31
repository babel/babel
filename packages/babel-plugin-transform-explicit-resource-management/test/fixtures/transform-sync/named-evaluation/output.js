let log = [];
let Symbol$dispose = Symbol.dispose || Symbol.for("Symbol.dispose");
try {
  var _usingCtx = babelHelpers.usingCtx();
  const foo = _usingCtx.u(babelHelpers.setFunctionName(class {
    static [Symbol$dispose]() {
      log.push(`${foo.name} is disposed`);
    }
  }, "foo"));
  log.push(foo.name);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
