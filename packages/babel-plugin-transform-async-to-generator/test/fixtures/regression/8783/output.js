(function () {
  var _poll = babelHelpers.asyncToGenerator(function* () {
    console.log(yield Promise.resolve('Hello'));
    setTimeout(poll, 1000);
  });

  function poll() {
    return _poll.apply(this, arguments);
  }

  return poll;
})()();
