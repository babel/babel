var a, b, c, d;
[a, [b, c], d] = ['hello', [',', 'junk'], ['world']];

// ----------------------------------------------------------------------------

expect('hello').toBe(a);
expect(',').toBe(b);
expect('junk').toBe(c);
expect(d).toEqual(['world']);;
