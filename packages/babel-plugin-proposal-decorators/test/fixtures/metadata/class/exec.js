function dec(_, ctx) {
  ctx.metadata.foo = 3;
}

Symbol.metadata = Symbol();

@dec
class A {}

expect(A[Symbol.metadata]).toEqual({ foo: 3 });
expect(Object.getPrototypeOf(A[Symbol.metadata])).toBe(null);
