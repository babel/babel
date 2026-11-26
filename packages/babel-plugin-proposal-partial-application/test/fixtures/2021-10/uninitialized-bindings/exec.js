function f(...args) {
  return args;
}

// A `var` is `undefined` until its initializer runs
var early = f~(x, ?);
var x = 1;
expect(early(2)).toEqual([undefined, 2]);

// `let`, `const` and classes are in TDZ until they are declared
expect(() => f~(y)).toThrow(ReferenceError);
const y = 1;
expect(() => {
  class C extends f~(C) {}
}).toThrow(ReferenceError);

// A function declaration can run before the bindings above it are declared
function hoisted() {
  return f~(z);
}
expect(hoisted).toThrow(ReferenceError);
let z = 1;
expect(hoisted()()).toEqual([1]);

switch (0) {
  case 1:
    let w = 1;
  case 0:
    expect(() => f~(w)).toThrow(ReferenceError);
}

"use strict";
const strictDefault = (b = f~(a), a) => b;
expect(() => strictDefault()).toThrow(ReferenceError);

// Initialized bindings
const before = 1;
const later = () => f~(before);
expect(later()()).toEqual([1]);

const fns = [];
for (const i of [0, 1]) {
  const j = i;
  fns.push(f~(i, j));
}
expect(fns.map(g => g())).toEqual([[0, 0], [1, 1]]);
