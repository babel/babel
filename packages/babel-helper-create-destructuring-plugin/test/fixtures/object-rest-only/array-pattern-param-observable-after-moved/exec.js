const log = [];
function logged(name, props) {
  const o = {};
  for (const key of Object.keys(props)) {
    Object.defineProperty(o, key, {
      enumerable: true,
      get() {
        log.push(name + "." + key);
        return props[key];
      },
    });
  }
  return o;
}

// The elements following a moved pattern are destructured after it: the
// whole parameter is moved.
function f([{ ...r }, { b }], c) {
  return [r, b, c];
}
expect(f([logged("A", { x: 1 }), logged("B", { b: 2 })], 4)).toEqual([
  { x: 1 },
  2,
  4,
]);
expect(log).toEqual(["A.x", "B.b"]);
expect(f.length).toBe(2);

// Their values are checked for null after the moved pattern is copied.
log.length = 0;
expect(() => f([logged("A", { x: 1 }), null])).toThrow(TypeError);
expect(log).toEqual(["A.x"]);

function g([{ ...r }, { b } = { b: 3 }]) {
  return [r, b];
}
expect(g([{ x: 1 }])).toEqual([{ x: 1 }, 3]);
expect(g([{ x: 1 }, { b: 2 }])).toEqual([{ x: 1 }, 2]);

log.length = 0;
function h([{ ...r }, [{ b }]]) {
  return [r, b];
}
expect(h([logged("A", { x: 1 }), [logged("B", { b: 2 })]])).toEqual([
  { x: 1 },
  2,
]);
expect(log).toEqual(["A.x", "B.b"]);

log.length = 0;
function i([{ ...r }, [{ ...s }]]) {
  return [r, s];
}
expect(i([logged("A", { x: 1 }), [logged("S", { y: 2 })]])).toEqual([
  { x: 1 },
  { y: 2 },
]);
expect(log).toEqual(["A.x", "S.y"]);

log.length = 0;
const j = ([{ ...r }, { b }]) => [r, b];
expect(j([logged("A", { x: 1 }), logged("B", { b: 2 })])).toEqual([
  { x: 1 },
  2,
]);
expect(log).toEqual(["A.x", "B.b"]);
