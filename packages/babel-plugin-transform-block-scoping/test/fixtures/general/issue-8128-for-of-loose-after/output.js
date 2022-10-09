var _loop = function (_result) {
  _result = otherValue;
  fn(() => {
    _result;
  });
  result = _result;
};
for (var _iterator = babelHelpers.createForOfIteratorHelperLoose(results), _step; !(_step = _iterator()).done;) {
  var result = _step.value;
  _loop(result);
}
