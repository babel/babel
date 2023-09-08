var _fn;
function fn() {
  return (_fn = _fn || babelHelpers.wrapAsyncGenerator(function* () {
    var _step = {};
    try {
      for (var _iterator = babelHelpers.asyncIterator([Promise.resolve("ok")]); !(_step = yield babelHelpers.awaitAsyncGenerator(_iterator.next())).done;) {
        const result = _step.value;
        {
          return {
            result
          };
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
