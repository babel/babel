(function poll() {
  return (poll = babelHelpers.asyncToGenerator(function* () {
    console.log(yield Promise.resolve('Hello'));
    setTimeout(poll, 1000);
  })).apply(this, arguments);
})();
