function f() {
  return _f.apply(this, arguments);
}

function _f() {
  _f = babelHelpers.asyncToGenerator(function* () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;

    var _iteratorError;

    try {
      for (var _iterator = babelHelpers.asyncIterator(a), _step; !(_iteratorNormalCompletion = (_step = yield _iterator.next()).done); _iteratorNormalCompletion = true) {
        let {
          x,
          y: [z]
        } = _step.value;
        g(x, z);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          yield _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
  return _f.apply(this, arguments);
}
