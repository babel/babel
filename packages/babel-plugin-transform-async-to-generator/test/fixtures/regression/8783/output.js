var _ref;
(function poll() {
  return (_ref = _ref || babelHelpers.asyncToGenerator(function* () {
    console.log(yield Promise.resolve('Hello'));
    setTimeout(poll, 1000);
  })).apply(this, arguments);
})();
