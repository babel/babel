var actualP = transformAsync(
  'var x = <sometag __source="custom" />;',
  Object.assign({}, opts, { filename: '/fake/path/mock.js' })
)

var expected = 'var x = <sometag __source="custom" />;';

return actualP.then(actual => {
  expect(actual.code).toBe(expected);
});
