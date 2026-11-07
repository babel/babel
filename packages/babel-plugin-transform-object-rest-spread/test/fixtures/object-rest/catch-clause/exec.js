try {} catch({ ...a34 }) {}
try {} catch({a1, ...b1}) {}
try {} catch({a2, b2, ...c2}) {}
try {} catch({a2, b2, c2: { c3, ...c4 }}) {}

// Unchanged
try {} catch(a) {}
try {} catch({ b }) {}

// The same catch clauses, with thrown values so that they are run.
var results = [];
var error = { x: 1, y: 2 };

try { throw error; } catch({ ...a34 }) {
  expect(a34).not.toBe(error);
  results.push(a34);
}
try { throw { a1: 1, z: 2 }; } catch({a1, ...b1}) {
  results.push([a1, b1]);
}
try { throw { a2: 1, b2: 2, w: 3 }; } catch({a2, b2, ...c2}) {
  results.push([a2, b2, c2]);
}
try { throw { a2: 1, b2: 2, c2: { c3: 3, v: 4 } }; } catch({a2, b2, c2: { c3, ...c4 }}) {
  results.push([a2, b2, c3, c4]);
}

// Unchanged
try { throw "a"; } catch(a) {
  results.push(a);
}
try { throw { b: "b" }; } catch({ b }) {
  results.push(b);
}

expect(results).toEqual([
  { x: 1, y: 2 },
  [1, { z: 2 }],
  [1, 2, { w: 3 }],
  [1, 2, 3, { v: 4 }],
  "a",
  "b",
]);

expect(() => {
  try { throw null; } catch({ ...a34 }) {}
}).toThrow(TypeError);
