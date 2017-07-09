babelHelpers.asyncToGenerator(function* () {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = babelHelpers.asyncIterator(iterable), _step, _value; _step = yield _iterator.next(), _iteratorNormalCompletion = _step.done, _value = yield _step.value, !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
      var _value2 = _value,
          _value3 = babelHelpers.slicedToArray(_value2, 1);

      const value = _value3[0];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        yield _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
})();
