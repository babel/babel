var k = { a: 1, b: 2 };
var o = { a: 3, ...k, b: k.a++ };

expect(o).toEqual({a: 1, b: 1});
