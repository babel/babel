var _iteratorHelper = babelHelpers.createForOfIteratorHelper(b),
    _step;

try {
  myLabel: //woops
  for (_iteratorHelper.s(); !(_step = _iteratorHelper.n()).done;) {
    let a = _step.value;
    continue myLabel;
  }
} catch (err) {
  _iteratorHelper.e(err);
} finally {
  _iteratorHelper.f();
}
