var a = [0, 1, 2, 3, 4]
var b = { valueOf: () => 2, toString: () => 0}
expect(a[:b]).toEqual([0, 1]);
expect(a[:b:2]).toEqual([0]);
expect(a[b:]).toEqual([2, 3, 4]);
expect(a[b::2]).toEqual([2, 4]);
expect(a[::b]).toEqual([0, 2, 4]);
expect(a[::-b]).toEqual([4, 2, 0]);

