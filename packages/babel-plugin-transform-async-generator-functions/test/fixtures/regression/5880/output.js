(async () => {
  var _step = {};
  try {
    for (var _iterator = babelHelpers.asyncIterator(iterable); !(_step = await _iterator.next()).done;) {
      const _step$value = babelHelpers.slicedToArray(_step.value, 1),
        value = _step$value[0];
    }
  } finally {
    try {
      if (!_step.done && _iterator.return != null) {
        await _iterator.return();
      }
    } catch (e) {}
  }
})();
