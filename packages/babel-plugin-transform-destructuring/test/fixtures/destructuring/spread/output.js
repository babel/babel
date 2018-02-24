function isSorted(_ref) {
  var _ref2 = babelHelpers.toArray(_ref),
      x = _ref2[0],
      y = _ref2[1],
      wow = _ref2.slice(2);

  if (!zs.length) return true;
  if (y > x) return isSorted(zs);
  return false;
}
