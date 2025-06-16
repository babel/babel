try {
  var _usingCtx = babelHelpers.usingCtx();
  let name;
  const _ = _usingCtx.u((0, class {
    static _ = name = this.name;
    static [Symbol.dispose || Symbol.for("Symbol.dispose")]() {}
  }));
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
