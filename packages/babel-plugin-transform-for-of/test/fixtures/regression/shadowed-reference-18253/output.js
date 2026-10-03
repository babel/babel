const obj = {};
for (var _i = 0, _arr = [1]; _i < _arr.length; _i++) {
  obj.value = _arr[_i];
  {
    const obj = 2;
  }
}
var _iterator = babelHelpers.createForOfIteratorHelper(iterable),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    o[key] = _step.value;
    {
      let key;
    }
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
var _iterator2 = babelHelpers.createForOfIteratorHelper(iterable),
  _step2;
try {
  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
    const {
      a = def
    } = _step2.value;
    {
      const def = 1;
    }
  }
} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}
