var k = { a: 1, b: 2 };
var o = { a: 3, ...k, b: k.a++ };
expect(o).toEqual({a: 1, b: 1});

var k = { a: 1, get b() { l = { z: 9 }; return 2; } };
var l = { c: 3 };
var o = { ...k, ...l };
expect(o).toEqual({ a: 1, b: 2, z: 9 });
