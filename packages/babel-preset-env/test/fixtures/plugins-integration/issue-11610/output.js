async function v() {
  let source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var _step = {};
  try {
    for (var _iterator = babelHelpers.asyncIterator([1]); !(_step = await _iterator.next()).done;) {
      source = _step.value;
    }
  } finally {
    try {
      if (!_step.done && _iterator.return != null) {
        await _iterator.return();
      }
    } catch (e) {}
  }
}
