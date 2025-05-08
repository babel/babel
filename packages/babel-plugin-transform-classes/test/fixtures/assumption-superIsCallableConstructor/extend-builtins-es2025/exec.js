class RangeIterator extends Iterator {}

expect(new RangeIterator).toBeInstanceOf(RangeIterator);
expect(new RangeIterator).toBeInstanceOf(Iterator);
