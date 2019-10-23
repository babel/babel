var a = [0, 1, 2, 3, 4];
expect(() => a[::0]).toThrow(/Slice step can not be zero, NaN or Infinity/);
