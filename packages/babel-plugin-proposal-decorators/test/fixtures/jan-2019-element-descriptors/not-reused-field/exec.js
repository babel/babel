var dec1, dec2;

class A {
  @(_ => dec1 = _)
  @(_ => dec2 = _)
  field = {}
}

expect(dec1).toEqual(dec2);
expect(dec1).not.toBe(dec2);
expect(dec1.initializer).toBe(dec2.initializer);
