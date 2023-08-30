function dec(v) {
  return (_, ctx) => {
    ctx.metadata.foo = v;
  };
}

Symbol.metadata = Symbol();

@dec(2)
class B {}

@dec(3)
class A extends B {}

expect(A[Symbol.metadata]).toEqual({ foo: 3 });
expect(Object.getPrototypeOf(A[Symbol.metadata])).toBe(B[Symbol.metadata]);
expect(B[Symbol.metadata]).toEqual({ foo: 2 });
expect(Object.getPrototypeOf(B[Symbol.metadata])).toBe(null);
