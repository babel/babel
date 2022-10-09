var _iterator = babelHelpers.createForOfIteratorHelper(b),
  _step;
try {
  myLabel:
  //woops
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    let a = _step.value;
    continue myLabel;
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
