const triple = function (x) {
  return x * 3;
};
async function myFunction(n) {
  var _ref;
  return _ref = Math.abs(n), triple(await Promise.resolve(_ref));
}
return myFunction(-7).then(function (result) {
  expect(result).toBe(21);
});
