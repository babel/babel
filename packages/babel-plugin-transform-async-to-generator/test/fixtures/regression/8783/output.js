var _poll;
(function poll() {
  return (_poll = _poll || babelHelpers.asyncToGenerator(function* () {
    console.log(yield Promise.resolve('Hello'));
    setTimeout(poll, 1000);
  })).apply(this, arguments);
})();
