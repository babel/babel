var _ref, _key;
var _source = source;
({
  w: tgt.x
} = _source);
rest = babelHelpers.objectWithoutProperties(_source, ["w"]);
var _ref2 = [source];
[_ref] = _ref2;
({
  [_key = key]: tgt.y
} = _ref);
rest2 = babelHelpers.objectWithoutProperties(_ref, [_key].map(babelHelpers.toPropertyKey));
_ref2;
