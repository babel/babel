(async () => {
  var _iterator = babelHelpers.asyncIterator(iterable),
    _step,
    _notDone;
  try {
    for (; _notDone = !(_step = await _iterator.next()).done; _notDone = false) {
      const _step$value = babelHelpers.slicedToArray(_step.value, 1),
        value = _step$value[0];
    }
  } catch (e) {
    _step = null;
    throw e;
  } finally {
    try {
      if (_notDone && _iterator.return) {
        await _iterator.return();
      }
    } catch (e) {
      if (_step) throw e;
    }
  }
})();
