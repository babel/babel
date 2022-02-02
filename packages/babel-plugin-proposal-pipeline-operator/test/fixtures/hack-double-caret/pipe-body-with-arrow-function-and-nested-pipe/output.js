var _ref4, _ref5, _ref6;

const result = (_ref6 = 5, (_ref5 = Math.pow(_ref6, 2), (_ref4 = [1, 2, 3].map(n => {
  var _ref, _ref2, _ref3;

  return _ref3 = n + _ref5, (_ref2 = _ref3 * 2, (_ref = `${_ref2} apples`, _ref.toUpperCase()));
}), _ref4.join())));
expect(result).toEqual('52 APPLES,54 APPLES,56 APPLES');
