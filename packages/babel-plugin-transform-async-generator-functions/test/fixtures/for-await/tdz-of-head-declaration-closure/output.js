function method() {
  return _method.apply(this, arguments);
}
function _method() {
  _method = babelHelpers.asyncToGenerator(function* () {
    var _iteratorAbruptCompletion = false;
    var _didIteratorError = false;
    var _iteratorError;
    var _object;
    _init: {
      _object = [() => x];
      break _init;
      let x;
    }
    try {
      for (var _iterator = babelHelpers.asyncIterator(_object), _step; _iteratorAbruptCompletion = !(_step = yield _iterator.next()).done; _iteratorAbruptCompletion = false) {
        const x = _step.value;
        {
          x();
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (_iteratorAbruptCompletion && _iterator.return != null) {
          yield _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
  return _method.apply(this, arguments);
}
