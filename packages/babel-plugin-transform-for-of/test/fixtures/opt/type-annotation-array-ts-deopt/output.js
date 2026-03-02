// This won't be optimize because when `for-of` is handled, the b's type annotation has been removed by the TS plugin
function a(b) {
  var _iterator = babelHelpers.createForOfIteratorHelper(b),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      const y = _step.value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
