"use strict";

// Classes in the heads of nested loops, in switch cases, in catch parameters
// and in computed keys of methods are evaluated once per iteration of the
// outer loop. The instances are read after the loop, when the variables of
// each iteration could have been replaced by the ones of the next iteration.
const saved = [];
for (let i = 0; i < 2; i++) {
  for (const C of [
    class {
      #x = i;
      static get(o) {
        return o.#x;
      }
    },
  ]) {
    saved.push([C, new C()]);
  }
  switch (i) {
    default:
      class D {
        #y = i;
        static get(o) {
          return o.#y;
        }
      }
      saved.push([D, new D()]);
  }
  switch (i) {
    default: {
      class E {
        #w = i;
        static get(o) {
          return o.#w;
        }
      }
      saved.push([E, new E()]);
    }
  }
  try {
    throw {};
  } catch ({
    F = class {
      #z = i;
      static get(o) {
        return o.#z;
      }
    },
  }) {
    saved.push([F, new F()]);
  }
  ({
    [(saved.push([
      { get: o => o.get() },
      new (class {
        #v = i;
        get() {
          return this.#v;
        }
      })(),
    ]),
    "m")]() {},
  });
  class Outer {
    [(saved.push([
      { get: o => o.get() },
      new (class {
        #u = i;
        get() {
          return this.#u;
        }
      })(),
    ]),
    "m")]() {}
  }
}
expect(saved.map(([C, o]) => C.get(o))).toEqual([
  0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
]);

// Classes in the parts of nested loop heads evaluated in each of their
// iterations are distinct in each of them
const observed = [];
for (const _ of [0]) {
  let first;
  for (const [
    C = class {
      #x;
      static has(o) {
        return #x in o;
      }
    },
  ] of [[], []]) {
    first ??= new C();
    observed.push(C.has(first));
  }
  let n = 0;
  while (
    n++ < 2 &&
    observed.push(
      new (class {
        #y;
        static has(o) {
          return #y in o;
        }
      })().constructor.has(first),
    )
  );
}
expect(observed).toEqual([true, false, false, false]);
