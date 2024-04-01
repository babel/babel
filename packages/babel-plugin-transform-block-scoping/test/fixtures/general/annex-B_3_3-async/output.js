if (true) {
  function run() {
    return _run.apply(this, arguments);
  }
  function _run() {
    _run = babelHelpers.asyncToGenerator(function* () {
      return true;
    });
    return _run.apply(this, arguments);
  }
}
function test() {
  return run();
}
