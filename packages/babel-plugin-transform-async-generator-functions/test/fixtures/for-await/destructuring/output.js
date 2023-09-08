var _f;
function f() {
  return (_f = _f || babelHelpers.asyncToGenerator(function* () {
    var _step = {};
    try {
      for (var _iterator = babelHelpers.asyncIterator(a); !(_step = yield _iterator.next()).done;) {
        let {
          x,
          y: [z]
        } = _step.value;
        {
          g(x, z);
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
