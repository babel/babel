var actualP = transformAsync(
  'var x = <sometag />',
  Object.assign({}, opts, { filename: '/fake/path/mock.js' })
)

var expected = `
var _jsxFileName = "/fake/path/mock.js";
var x = <sometag __source={{
  fileName: _jsxFileName,
  lineNumber: 1,
  columnNumber: 9
}} />;
`.trim();

return actualP.then(actual => {
  expect(actual.code).toBe(expected);
});
