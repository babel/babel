var a = [];
var b = [0, ...a];
var c = [...b, ...b];
var d;
var e = [0, ...(d = [1, 2]), 3];
var f = [0, ...[[1, 2], [3, 4]], 5];

// ----------------------------------------------------------------------------

expect(b).toEqual([0]);;
expect(c).toEqual([0, 0]);;
expect(d).toEqual([1, 2]);;
expect(e).toEqual([0, 1, 2, 3]);;
expect(f).toEqual([0, [1, 2], [3, 4], 5]);;
