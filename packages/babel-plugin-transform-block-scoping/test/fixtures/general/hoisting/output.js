var _loop = function (i) {
  x = 5;
  ({
    f
  } = {
    f: 2
  });
  fns.push(function () {
    return i * x;
  });
};

var _iteratorHelper = babelHelpers.createForOfIteratorHelper(nums),
    _step;

try {
  for (_iteratorHelper.s(); !(_step = _iteratorHelper.n()).done;) {
    var i = _step.value;
    var x;
    var f;

    _loop(i);
  }
} catch (err) {
  _iteratorHelper.e(err);
} finally {
  _iteratorHelper.f();
}
