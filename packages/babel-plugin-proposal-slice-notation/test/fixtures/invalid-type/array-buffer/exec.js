var a = new ArrayBuffer(8);
expect(() => a[::]).toThrow(/Slice notation only supports array, string and typed array/);

var b = new SharedArrayBuffer(8);
expect(() => b[::]).toThrow(/Slice notation only supports array, string and typed array/);

