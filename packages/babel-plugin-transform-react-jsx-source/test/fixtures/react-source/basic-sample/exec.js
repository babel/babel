var actual = transform(
  'var x = <sometag />',
  Object.assign({}, opts, { filename: '/fake/path/mock.js' })
).code;

var expected = `
  var _jsxFileName = "/fake/path/mock.js";
  var x = <sometag __source={{
    fileName: _jsxFileName,
    lineNumber: 1,
    columnNumber: 9
  }} />;
`;

expect(actual).toBe(expected);
