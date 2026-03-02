var _loop = function () {
  var result = _step.value;
  result = otherValue;
  fn(() => {
    result;
  });
};
for (var _iterator = babelHelpers.createForOfIteratorHelperLoose(results), _step; !(_step = _iterator()).done;) {
  _loop();
}
