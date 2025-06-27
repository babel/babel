class RangeIterator extends Iterator {}

expect(() => new RangeIterator).toThrow("Constructor Iterator requires 'new'");
