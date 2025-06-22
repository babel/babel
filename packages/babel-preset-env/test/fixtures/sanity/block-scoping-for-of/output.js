var _loop = function _loop(a) {
  a = 1;
  (function () {
    return a;
  });
};
// https://github.com/babel/babel/issues/7557
var _iterator = babelHelpers.createForOfIteratorHelper(c),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var _step$value = babelHelpers.slicedToArray(_step.value, 1),
      a = _step$value[0];
    _loop(a);
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
