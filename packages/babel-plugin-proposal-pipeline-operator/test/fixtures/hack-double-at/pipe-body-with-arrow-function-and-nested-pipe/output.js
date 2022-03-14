var _ref2;

const result = (_ref2 = Math.pow(5, 2), [1, 2, 3].map(n => {
  var _ref;

  return _ref = (n + _ref2) * 2, `${_ref} apples`.toUpperCase();
}).join());
expect(result).toEqual('52 APPLES,54 APPLES,56 APPLES');
