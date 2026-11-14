// https://github.com/babel/babel/issues/10743
var fooCount = 0;
var o = {
  get foo() {
    fooCount++;
    return { bar: 42, baz: 43 };
  },
};
var { foo: { bar, ...qux } } = o;
expect(fooCount).toBe(1);
expect(bar).toBe(42);
expect(qux).toEqual({ baz: 43 });

// the outer rest excludes the keys destructured before it
const { a: { ...innerA }, b: { ...innerB }, ...outer } = { a: { x: 1 }, b: { y: 2 }, c: 3 };
expect(innerA).toEqual({ x: 1 });
expect(innerB).toEqual({ y: 2 });
expect(outer).toEqual({ c: 3 });
