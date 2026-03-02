var _ref;
const result = (_ref = Math.pow(5, 2), [1, 2, 3].map(n => `${(n + _ref) * 2} apples`.toUpperCase()).join());
expect(result).toEqual('52 APPLES,54 APPLES,56 APPLES');
