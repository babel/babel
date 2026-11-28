function method() {
  return _method.apply(this, arguments);
}
function _method() {
  _method = babelHelpers.asyncToGenerator(function* () {
    let a = 0;
    var _iteratorAbruptCompletion = false;
    var _didIteratorError = false;
    var _iteratorError;
    var _object;
    _init: {
      _object = (a = 1, [2]);
      break _init;
      let a;
    }
    try {
      for (var _iterator = babelHelpers.asyncIterator(_object), _step; _iteratorAbruptCompletion = !(_step = yield _iterator.next()).done; _iteratorAbruptCompletion = false) {
        const a = _step.value;
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
    return a;
  });
  return _method.apply(this, arguments);
}
