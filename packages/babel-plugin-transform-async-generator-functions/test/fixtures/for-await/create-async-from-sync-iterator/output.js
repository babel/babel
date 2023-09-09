var _fn;
function fn() {
  return (_fn = _fn || babelHelpers.wrapAsyncGenerator(function* () {
    var _iterator = babelHelpers.asyncIterator([Promise.resolve("ok")]),
      _step = {},
      _notDone;
    try {
      for (; _notDone = !(_step = yield babelHelpers.awaitAsyncGenerator(_iterator.next())).done; _notDone = false) {
        const result = _step.value;
        {
          return {
            result
          };
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
