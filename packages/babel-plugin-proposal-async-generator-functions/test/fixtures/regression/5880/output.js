(async () => {
  var _iteratorAbruptCompletion = false;
  var _didIteratorError = false;

  var _iteratorError;

  try {
    for (var _iterator = babelHelpers.asyncIterator(iterable), _step; _iteratorAbruptCompletion = !(_step = await _iterator.next()).done; _iteratorAbruptCompletion = false) {
      const _await$_step$value = await _step.value,
            _await$_step$value2 = babelHelpers.slicedToArray(_await$_step$value, 1),
            value = _await$_step$value2[0];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (_iteratorAbruptCompletion && _iterator.return != null) {
        await _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
})();
