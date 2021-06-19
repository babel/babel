(async () => {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;

  var _iteratorError;

  try {
    for (var _iterator = babelHelpers.asyncIterator(iterable), _step; !(_iteratorNormalCompletion = (_step = await _iterator.next()).done); _iteratorNormalCompletion = true) {
      const _step$value = babelHelpers.slicedToArray(_step.value, 1),
            value = _step$value[0];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        await _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
})();
