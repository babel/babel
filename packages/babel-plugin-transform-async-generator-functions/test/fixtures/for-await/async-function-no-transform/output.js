async function foo() {
  var _iteratorAbruptCompletion = false;
  var _didIteratorError = false;
  var _iteratorError;
  try {
    for (var _iterator = babelHelpers.asyncIterator(y), _step; _iteratorAbruptCompletion = !(_step = await _iterator.next()).done; _iteratorAbruptCompletion = false) {
      const x = _step.value;
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
}
