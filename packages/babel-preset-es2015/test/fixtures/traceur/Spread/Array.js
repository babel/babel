var a = [];
var b = [0, ...a];
var c = [...b, ...b];
var d;
var e = [0, ...d = [1, 2], 3];
var f = [0, ...[[1, 2], [3, 4]], 5];

// ----------------------------------------------------------------------------

assertArrayEquals([0], b);
assertArrayEquals([0, 0], c);
assertArrayEquals([1, 2], d);
assertArrayEquals([0, 1, 2, 3], e);
assertArrayEquals([0, [1, 2], [3, 4], 5], f);
