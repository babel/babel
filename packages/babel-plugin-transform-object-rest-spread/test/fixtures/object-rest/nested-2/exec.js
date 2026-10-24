const test = {
  foo: {
    bar: {
      baz: {
        a: {
          x: 1,
          y: 2,
          z: 3,
        },
      },
    },
  },
};

const { foo: { bar: { baz: { a: { x, ...other } } } } } = test;

expect(x).toBe(1);
expect(other).toEqual({ y: 2, z: 3 });
expect(other).not.toBe(test.foo.bar.baz.a);
