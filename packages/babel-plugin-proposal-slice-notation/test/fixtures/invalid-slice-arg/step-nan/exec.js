var a = [0, 1, 2, 3, 4];
expect(() => a[::NaN]).toThrow(/Slice step can not be zero, NaN of Infinity/);
