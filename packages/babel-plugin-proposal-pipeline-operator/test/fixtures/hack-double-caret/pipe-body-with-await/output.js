function triple(x) {
  return x * 3;
}
async function asyncFunction(n) {
  var _ref;
  return _ref = Math.abs(n), triple(await Promise.resolve(_ref));
}
asyncFunction(-7).then(result => {
  expect(result).toBe(21);
});
