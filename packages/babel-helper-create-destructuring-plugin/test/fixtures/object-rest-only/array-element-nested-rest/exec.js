const log = [];
function* gen(...vals) {
  log.push("iter");
  try {
    for (const v of vals) {
      log.push("next");
      yield v;
    }
  } finally {
    log.push("return");
  }
}
function logged(name, props) {
  const o = {};
  for (const key of Object.keys(props)) {
    Object.defineProperty(o, key, {
      enumerable: true,
      get() {
        log.push("get " + name + "." + key);
        return props[key];
      },
    });
  }
  return o;
}
const value = () => logged("E", { a: logged("A", { b: 1, c: 2 }) });

// The object pattern around a nested rest stays in the array pattern: its
// properties are read while iterating, before the next element. Only the rest
// element is copied after the iteration.
const [k, { a: { b, ...r } }, z] = gen("k", value(), "z");
expect([k, b, r, z]).toEqual(["k", 1, { c: 2 }, "z"]);
expect(log).toEqual([
  "iter",
  "next",
  "next",
  "get E.a",
  "next",
  "return",
  "get A.b",
  "get A.c",
]);

// So is its null check
log.length = 0;
expect(() => {
  const [k, { a: { ...r } }, z] = gen("k", null, "z");
}).toThrow(TypeError);
expect(log).toEqual(["iter", "next", "next", "return"]);

log.length = 0;
let k2, b2, r2;
[k2, { a: { b: b2, ...r2 } }] = gen("k", value());
expect([k2, b2, r2]).toEqual(["k", 1, { c: 2 }]);
expect(log).toEqual([
  "iter",
  "next",
  "next",
  "get E.a",
  "return",
  "get A.b",
  "get A.c",
]);

log.length = 0;
function f([k, { a: { b, ...r } }, z]) {
  return [k, b, r, z];
}
expect(f(gen("k", value(), "z"))).toEqual(["k", 1, { c: 2 }, "z"]);
expect(log).toEqual([
  "iter",
  "next",
  "next",
  "get E.a",
  "next",
  "return",
  "get A.b",
  "get A.c",
]);

// A default or a key reading a hoisted binding sees it initialized
const [{ a: { ...w }, b: y = w }] = [{ a: { x: 1 } }];
expect(y).toBe(w);
const [{ a: { ...q }, [q.key]: p }] = [{ a: { key: "p" }, p: 2 }];
expect(p).toBe(2);
