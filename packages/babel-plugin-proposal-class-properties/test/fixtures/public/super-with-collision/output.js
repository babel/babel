var A = function A(_force) {
  babelHelpers.classCallCheck(this, A);
  Object.defineProperty(this, "force", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: force
  });
  Object.defineProperty(this, "foo", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: babelHelpers.get(babelHelpers.getPrototypeOf(A.prototype), "method", babelHelpers.assertThisInitialized(this)).call(this)
  });
};
