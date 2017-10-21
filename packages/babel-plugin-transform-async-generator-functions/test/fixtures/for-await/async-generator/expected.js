let g = (() => {
  var _ref = babelHelpers.wrapAsyncGenerator(function* () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;

    var _iteratorError;

    try {
      for (var _iterator = babelHelpers.asyncIterator(y), _step, _value; _step = yield babelHelpers.awaitAsyncGenerator(_iterator.next()), _iteratorNormalCompletion = _step.done, _value = yield babelHelpers.awaitAsyncGenerator(_step.value), !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
        let x = _value;
        f(x);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          yield babelHelpers.awaitAsyncGenerator(_iterator.return());
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });

  return function g() {
    return _ref.apply(this, arguments);
  };
})();
