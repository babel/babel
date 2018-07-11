const bar = 123;
{ const bar = 456; }
expect(bar).toBe(123);
