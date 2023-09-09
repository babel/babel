var _g;
function g() {
  return (_g = _g || babelHelpers.wrapAsyncGenerator(function* () {
    var _iterator = babelHelpers.asyncIterator(y),
      _step = {},
      _notDone;
    try {
      for (; _notDone = !(_step = yield babelHelpers.awaitAsyncGenerator(_iterator.next())).done; _notDone = false) {
        let x = _step.value;
        {
          f(x);
        }
      }
    } catch (e) {
      _step = null;
      throw e;
    } finally {
      try {
        if (_notDone && _iterator.return) {
          yield babelHelpers.awaitAsyncGenerator(_iterator.return());
        }
      } catch (e) {
        if (_step) throw e;
      }
    }
  })).apply(this, arguments);
}
