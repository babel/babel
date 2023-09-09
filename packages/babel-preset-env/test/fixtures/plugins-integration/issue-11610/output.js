async function v() {
  let source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var _iterator = babelHelpers.asyncIterator([1]),
    _step = {},
    _notDone;
  try {
    for (; _notDone = !(_step = await _iterator.next()).done; _notDone = false) {
      source = _step.value;
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
