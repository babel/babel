var a = new Uint8Array([0, 1, 2, 3, 4])
expect(a[0:2:2]).toEqual(new Uint8Array([0]));

var b = new Float32Array([0.0, NaN, -Infinity, Infinity]);
expect(b[::-1]).toEqual(new Float32Array([Infinity, -Infinity, NaN, 0.0]));
