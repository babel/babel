var _f;
function f() {
  return (_f = _f || babelHelpers.asyncToGenerator(function* () {
    var _step = {};
    try {
      for (var _iterator = babelHelpers.asyncIterator(y); !(_step = yield _iterator.next()).done;) {
        let x = _step.value;
        {
          g(x);
        }
      }
    } finally {
      try {
        if (!_step.done && _iterator.return != null) {
          yield _iterator.return();
        }
      } catch (e) {}
    }
  })).apply(this, arguments);
}
