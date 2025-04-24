class Foo {
  one(_x) {
    return babelHelpers.asyncToGenerator(function* (a, b = 1) {}).apply(this, arguments);
  }
  two(a, b, ...c) {
    return babelHelpers.asyncToGenerator(function* () {})();
  }
  three(_x2) {
    return babelHelpers.asyncToGenerator(function* (a, b = 1, c, d = 3) {}).apply(this, arguments);
  }
  four(_x3) {
    return babelHelpers.asyncToGenerator(function* (a, b = 1, c, ...d) {}).apply(this, arguments);
  }
  five(_x4, _x5) {
    return babelHelpers.asyncToGenerator(function* (a, {
      b
    }) {}).apply(this, arguments);
  }
  six(_x6) {
    return babelHelpers.asyncToGenerator(function* (a, {
      b
    } = {}) {}).apply(this, arguments);
  }
}
