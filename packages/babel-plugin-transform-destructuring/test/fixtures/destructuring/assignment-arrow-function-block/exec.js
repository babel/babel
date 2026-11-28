var a, b;
var fn = () => { [a, b] = [1, 2] }

expect(fn()).toBeUndefined();
expect([a, b]).toEqual([1, 2]);
