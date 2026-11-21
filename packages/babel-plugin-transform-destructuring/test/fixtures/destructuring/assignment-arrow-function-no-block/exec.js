var a, b;
var fn = () => [a, b] = [1, 2]

expect(fn()).toEqual([1, 2]);
expect([a, b]).toEqual([1, 2]);

var source = [3, 4];
var fn2 = () => [a, b] = source;
expect(fn2()).toBe(source);
expect([a, b]).toEqual([3, 4]);
