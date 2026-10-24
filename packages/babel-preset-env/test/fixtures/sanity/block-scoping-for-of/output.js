// https://github.com/babel/babel/issues/7557
var _iterator = babelHelpers.createForOfIteratorHelper(c),
  _step;
try {
  var _loop = function _loop() {
    var _ref = _step.value;
    var a = babelHelpers.slicedToArray(_ref, 1)[0];
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
