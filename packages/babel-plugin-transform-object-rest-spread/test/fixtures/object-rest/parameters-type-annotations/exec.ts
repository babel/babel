// The type annotations are removed, since the fixture doesn't strip them, and
// the empty function bodies return the bindings so they can be checked.
function f({ ...a }, b = a) { return [a, b]; }
function g({ ...a }, [b]) { return [a, b]; }

var arg = { x: 1 };
var [a, b] = f(arg);
expect(a).toEqual({ x: 1 });
expect(a).not.toBe(arg);
expect(b).toBe(a);
expect(f({ x: 1 }, 2)).toEqual([{ x: 1 }, 2]);
expect(f.length).toBe(1);
expect(() => f(null)).toThrow(TypeError);

expect(g({ y: 1 }, ["b", "c"])).toEqual([{ y: 1 }, "b"]);
expect(g({}, [])).toEqual([{}, undefined]);
expect(g.length).toBe(2);
expect(() => g(undefined, [])).toThrow(TypeError);
expect(() => g({}, null)).toThrow(TypeError);
