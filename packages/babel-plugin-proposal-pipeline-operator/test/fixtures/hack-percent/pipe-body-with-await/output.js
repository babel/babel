function triple(x) {
  return x * 3;
}

async function asyncFunction(n) {
  var _ref, _ref2, _ref3;

  return _ref3 = n, (_ref2 = Math.abs(_ref3), (_ref = await Promise.resolve(_ref2), triple(_ref)));
}

asyncFunction(-7).then(result => {
  expect(result).toBe(21);
});
