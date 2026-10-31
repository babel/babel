var _source, _ref2, _ref, _ref3, _key;
_source = source, {
  w: tgt.x
} = _source, rest = babelHelpers.objectWithoutProperties(_source, ["w"]);
[_ref] = _ref2 = [source], _ref3 = _ref, {
  [_key = babelHelpers.toPropertyKey(key)]: tgt.y
} = _ref3, rest2 = babelHelpers.objectWithoutProperties(_ref3, [_key]), _ref2;
