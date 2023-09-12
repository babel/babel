class A {
  static {
    try {
      var _usingCtx = babelHelpers.usingCtx();
      const x = _usingCtx.using(y);
      doSomethingWith(x);
    } catch (_) {
      _usingCtx.e = _;
    } finally {
      _usingCtx.dispose();
    }
  }
}
