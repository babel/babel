async function foo() {
  var _step = {};
  try {
    for (var _iterator = babelHelpers.asyncIterator(y); !(_step = await _iterator.next()).done;) {
      const x = _step.value;
    }
  } finally {
    try {
      if (!_step.done && _iterator.return != null) {
        await _iterator.return();
      }
    } catch (e) {}
  }
}
