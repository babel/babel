const triple = function (x) {
  return x * 3;
};

async function myFunction(n) {
  var _ref, _ref2, _ref3, _ref4;

  return _ref4 = n, (_ref3 = Math.abs(_ref4), (_ref2 = Promise.resolve(_ref3), (_ref = await _ref2, triple(_ref))));
}

return myFunction(-7).then(function (result) {
  expect(result).toBe(21);
});
