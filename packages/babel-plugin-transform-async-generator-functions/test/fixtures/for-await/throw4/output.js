function* gen() {
  try {
    yield 1;
  } finally {
    throw 2;
  }
}
return babelHelpers.asyncToGenerator(function* () {
  let err;
  try {
    var _iterator = babelHelpers.asyncIterator(gen()),
      _step = {},
      _notDone;
    try {
      for (; _notDone = !(_step = yield _iterator.next()).done; _notDone = false) {
        const _ = _step.value;
        {
          break;
        }
      }
    } catch (e) {
      _step = null;
      throw e;
    } finally {
      try {
        if (_notDone && _iterator.return) {
          yield _iterator.return();
        }
      } catch (e) {
        if (_step) throw e;
      }
    }
  } catch (e) {
    err = e;
  }
  expect(err).toBe(2);
})();
