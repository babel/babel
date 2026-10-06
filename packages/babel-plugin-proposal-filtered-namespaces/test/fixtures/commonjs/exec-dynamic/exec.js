const filtered = import("./dep.cjs", { exports: ["b", "a", "a"] }).then(ns => {
  expect(Object.keys(ns)).toEqual(["a", "b"]);
  expect("c" in ns).toBe(false);
  expect(Object.isFrozen(ns)).toBe(true);
  expect(Object.prototype.toString.call(ns)).toBe("[object Module]");

  // Live bindings
  expect(ns.a).toBe(1);
  return import("./dep.cjs").then(dep => {
    dep.increment();
    expect(ns.a).toBe(2);
  });
});

// `exports` that are not statically known
const names = ["b", "a", "a"];
const filteredDynamic = import("./dep.cjs", { exports: names }).then(ns => {
  expect(Object.keys(ns)).toEqual(["a", "b"]);
  expect(Object.prototype.toString.call(ns)).toBe("[object Module]");
});

// Options without `exports` that are not statically known
const options = { with: {} };
const unfiltered = import("./dep.cjs", options).then(ns => {
  expect(ns.c).toBe("c");
});

const missing = expect(
  import("./dep.cjs", { exports: ["a", "missing"] }),
).rejects.toThrow(ReferenceError);

const invalid = expect(
  import("./dep.cjs", { exports: [1] }),
).rejects.toThrow(TypeError);

// Errors while evaluating the options are thrown synchronously.
expect(() =>
  import(
    "./dep.cjs",
    (() => {
      throw new Error("options");
    })(),
  ),
).toThrow("options");

return Promise.all([filtered, filteredDynamic, unfiltered, missing, invalid]);
