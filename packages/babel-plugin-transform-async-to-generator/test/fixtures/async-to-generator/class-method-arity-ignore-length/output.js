class Foo {
  one() {
    return babelHelpers.asyncToGenerator(function* (a, b = 1) {}).apply(this, arguments);
  }
  two(a, b, ...c) {
    return babelHelpers.asyncToGenerator(function* () {})();
  }
  three() {
    return babelHelpers.asyncToGenerator(function* (a, b = 1, c, d = 3) {}).apply(this, arguments);
  }
  four() {
    return babelHelpers.asyncToGenerator(function* (a, b = 1, c, ...d) {}).apply(this, arguments);
  }
  five() {
    return babelHelpers.asyncToGenerator(function* (a, {
      b
    }) {}).apply(this, arguments);
  }
  six() {
    return babelHelpers.asyncToGenerator(function* (a, {
      b
    } = {}) {}).apply(this, arguments);
  }
}
