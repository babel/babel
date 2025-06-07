class BigInt64List extends BigInt64Array {}

expect(new BigInt64List).toBeInstanceOf(BigInt64List);
expect(new BigInt64List).toBeInstanceOf(BigInt64Array);
