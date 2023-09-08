var _g;
function g() {
  return (_g = _g || babelHelpers.wrapAsyncGenerator(function* () {
    var _step = {};
    try {
      for (var _iterator = babelHelpers.asyncIterator(y); !(_step = yield babelHelpers.awaitAsyncGenerator(_iterator.next())).done;) {
        let x = _step.value;
        {
          f(x);
        }
      }
    } finally {
      try {
        if (!_step.done && _iterator.return != null) {
          yield babelHelpers.awaitAsyncGenerator(_iterator.return());
        }
      } catch (e) {}
    }
  })).apply(this, arguments);
}
