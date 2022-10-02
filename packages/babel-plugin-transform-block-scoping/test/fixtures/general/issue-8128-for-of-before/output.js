var _iterator = babelHelpers.createForOfIteratorHelper(results),
  _step;
try {
  var _loop = function () {
    var result = _step.value;
    result = otherValue;
    fn(() => {
      result;
    });
  };
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
