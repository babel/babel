(() => new Promise(function ($return, $error) {
  for await (const _ref of iterable) {
    var _ref2 = babelHelpers.slicedToArray(_ref, 1);

    const value = _ref2[0];
  }

  return $return();
}))();
