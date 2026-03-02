function dec(v) {
  return (_, ctx) => {
    ctx.metadata.foo = v;
  };
}

Symbol.metadata = Symbol();

class B {}

@dec(3)
class A extends B {}

expect(A[Symbol.metadata]).toEqual({ foo: 3 });
expect(Object.getPrototypeOf(A[Symbol.metadata])).toBe(null);
