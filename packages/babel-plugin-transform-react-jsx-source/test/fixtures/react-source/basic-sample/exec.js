var res = transform(
  'var x = <sometag />',
  Object.assign({}, opts, { filename: '/fake/path/mock.js' })
);

var expected = multiline([
  'var __jsxFileName = "/fake/path/mock.js";',
  'var x = <sometag __source={{',
  '  fileName: __jsxFileName,',
  '  lineNumber: 1',
  '}} />;',
]);

assert.equal(expected, res.code);
