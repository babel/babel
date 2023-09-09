async function foo() {
  var _iterator = babelHelpers.asyncIterator(y),
    _step = {},
    _notDone;
  try {
    for (; _notDone = !(_step = await _iterator.next()).done; _notDone = false) {
      const x = _step.value;
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
}
