var dec1, dec2;

class A {
  @(_ => dec1 = _)
  @(_ => dec2 = _)
  fn() {}
}

expect(dec1).toEqual(dec2);
expect(dec1).not.toBe(dec2);
expect(dec1.descriptor).toEqual(dec2.descriptor);
expect(dec1.descriptor).not.toBe(dec2.descriptor);
expect(dec1.descriptor.value).toBe(dec2.descriptor.value);
