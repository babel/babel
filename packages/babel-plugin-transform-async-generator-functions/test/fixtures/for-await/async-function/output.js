var _f;
function f() {
  return (_f = _f || babelHelpers.asyncToGenerator(function* () {
    var _iterator = babelHelpers.asyncIterator(y),
      _step,
      _notDone;
    try {
      for (; _notDone = !(_step = yield _iterator.next()).done; _notDone = false) {
        let x = _step.value;
        {
          g(x);
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
  })).apply(this, arguments);
}
