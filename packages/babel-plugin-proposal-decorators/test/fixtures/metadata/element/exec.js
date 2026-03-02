function dec(_, ctx) {
  ctx.metadata.foo = 3;
}

Symbol.metadata = Symbol();

class A {
  @dec
  foo;
}

expect(A[Symbol.metadata]).toEqual({ foo: 3 });
expect(Object.getPrototypeOf(A[Symbol.metadata])).toBe(null);
