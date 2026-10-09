class SharedListBuffer extends SharedArrayBuffer {}

expect(new SharedListBuffer).toBeInstanceOf(SharedListBuffer);
expect(new SharedListBuffer).toBeInstanceOf(SharedArrayBuffer);
