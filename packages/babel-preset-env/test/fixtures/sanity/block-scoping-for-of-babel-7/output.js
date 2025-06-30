// https://github.com/babel/babel/issues/7557
var _iterator = babelHelpers.createForOfIteratorHelper(c),
  _step;
try {
  var _loop = function _loop() {
    var _step$value = babelHelpers.slicedToArray(_step.value, 1),
      a = _step$value[0];
    a = 1;
    (function () {
      return a;
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
