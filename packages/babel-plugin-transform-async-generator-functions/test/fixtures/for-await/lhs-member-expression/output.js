babelHelpers.asyncToGenerator(function* () {
  var _step = {};
  try {
    for (var _iterator = babelHelpers.asyncIterator(y); !(_step = yield _iterator.next()).done;) {
      obj.x = _step.value;
    }
  } finally {
    try {
      if (!_step.done && _iterator.return != null) {
        yield _iterator.return();
      }
    } catch (e) {}
  }
})();
