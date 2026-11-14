// A pattern parameter following a moved one is destructured after it, in the
// body. Its default value stays in the list when it can't run user code: the
// arrow function doesn't need to read `arguments`.
var copied = false;
function source() {
  copied = false;
  return new Proxy(
    {},
    {
      ownKeys(target) {
        copied = true;
        return Reflect.ownKeys(target);
      },
    },
  );
}

var f = ({ ...r }, { a = () => 1 } = { a: () => 0 }) => [r, a()];
expect(() => new f({})).toThrow(TypeError);
expect(f.length).toBe(1);
expect(f({ x: 1 })).toEqual([{ x: 1 }, 0]);
expect(f({ x: 1 }, {})).toEqual([{ x: 1 }, 1]);
expect(
  f(source(), {
    get a() {
      return () => copied;
    },
  }),
).toEqual([{}, true]);

var g = ({ ...r }, [a] = []) => [r, a];
expect(() => new g({})).toThrow(TypeError);
expect(g({})).toEqual([{}, undefined]);
expect(
  g(source(), {
    *[Symbol.iterator]() {
      yield copied;
    },
  }),
).toEqual([{}, true]);

// The closures of its default values still see the bindings of the outer
// scope, not the declarations of the body.
var x = 1;
function h({ ...r }, [a = () => x] = []) {
  var x = 2;
  return a();
}
expect(h({})).toBe(1);
