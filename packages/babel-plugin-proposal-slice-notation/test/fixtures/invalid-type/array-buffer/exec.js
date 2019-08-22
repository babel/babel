var a = new ArrayBuffer(8);
expect(() => a[::]).toThrow(/Slice notation only supports array, string and typed array/);

var semver = require("semver");
if (semver.gte(process.version, "8.10.0")) {
  var b = new SharedArrayBuffer(8);
  expect(() => b[::]).toThrow(/Slice notation only supports array, string and typed array/);
}

