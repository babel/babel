var dec1, dec2;

@(_ => dec1 = _)
@(_ => dec2 = _)
class A {}

expect(dec1).toEqual(dec2);
expect(dec1).not.toBe(dec2);
