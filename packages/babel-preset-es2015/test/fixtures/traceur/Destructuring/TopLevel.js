var a, b, c, d;
[a, [b, c], d] = ['hello', [',', 'junk'], ['world']];

// ----------------------------------------------------------------------------

expect(a).toBe('hello');
expect(b).toBe(',');
expect(c).toBe('junk');
expect(d).toEqual(['world']);
