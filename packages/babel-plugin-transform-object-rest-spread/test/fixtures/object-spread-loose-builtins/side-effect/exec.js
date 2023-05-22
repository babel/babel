var k = { a: 1, b: 2 };
var o = { a: 3, ...k, b: k.a++ };
// Loose will evaluate the static `b: k.a++` before spreading `...k`.
// It should be {a: 1, b: 1}
expect(o).toEqual({a: 2, b: 1});

var k = { a: 1, get b() { l = { z: 9 }; return 2; } };
var l = { c: 3 };
var o = { ...k, ...l };
// Loose will evaluate the `l` before spreading `...k`.
// It should be {a: 1, b: 2, z: 9}
expect(o).toEqual({ a: 1, b: 2, c: 3 });
