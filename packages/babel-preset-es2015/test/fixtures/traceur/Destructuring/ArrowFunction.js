var f = ({x}) => x;
expect(42).toBe(f({x: 42}));

var g = ({x: y, z: [a, b, ...c]}) => [y, a, b, c];
expect(g({x: 1, z: [2, 3, 4, 5]})).toEqual([1, 2, 3, [4, 5]]);

var h = ([a, {b: c, d}]) => [a, c, d];
expect(h([1, {b: 2, d: 3}])).toEqual([1, 2, 3]);

var i = ([, a]) => a;
expect(i([0, 1])).toBe(1);

var j = ([, [, a]]) => a;
expect(j([0, [1, 2]])).toBe(2);

var k = ([a] = new String('b')) => a;
expect(k()).toBe('b');
