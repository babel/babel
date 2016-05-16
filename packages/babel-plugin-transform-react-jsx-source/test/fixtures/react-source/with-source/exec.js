var actual = transform(
  'var x = <sometag __source="custom" />;',
  Object.assign({}, opts, { filename: '/fake/path/mock.js' })
).code;

var expected = 'var x = <sometag __source="custom" />;';

assert.equal(actual, expected);
