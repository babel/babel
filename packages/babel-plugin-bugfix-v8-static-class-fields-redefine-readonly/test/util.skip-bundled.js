import {
  getPotentiallyBuggyFieldsIndexes,
  getNameOrLengthStaticFieldsIndexes,
  toRanges,
} from "../lib/util.js";

import { parseSync, traverse } from "@babel/core";

function classPath(input) {
  let targetPath;
  traverse(parseSync(input, { filename: "example.js", configFile: false }), {
    Class(path) {
      targetPath = path;
      path.stop();
    },
  });
  return targetPath;
}

describe("getPotentiallyBuggyFieldsIndexes", () => {
  const cases = {
    "'name' static field": {
      code: `class A { static name = 2 }`,
      indexes: [0],
    },
    "'length' static field": {
      code: `class A { static length = 2 }`,
      indexes: [0],
    },
    "'name' instance field": {
      code: `class A { name = 2 }`,
      indexes: [],
    },
    "'length' instance field": {
      code: `class A { length = 2 }`,
      indexes: [],
    },
    "'#name' static field": {
      code: `class A { static #name = 2 }`,
      indexes: [],
    },
    "'#length' static field": {
      code: `class A { static #length = 2 }`,
      indexes: [],
    },
    "'name' static field after other elements": {
      code: `class A {
        foo() {}
        bar = 1;
        static baz() {}
        static name = 2
      }`,
      indexes: [3],
    },
    "'length' static field after other elements": {
      code: `class A {
        foo() {}
        bar = 1;
        static baz() {}
        static length = 2
      }`,
      indexes: [3],
    },
    "computed static field": {
      code: `class A {
        static [len];
      }`,
      indexes: [0],
    },
    "static field after static block": {
      code: `class A {
        static safe = 2;
        static { defineReadOnly(A, "unsafe") }
        static unsafe = 3;
        static unsafe2 = 4;
      }`,
      indexes: [2, 3],
    },
    "static field after ref + side effect in private static field": {
      code: `class A {
        static safe = 2;
        static #y = 0;
        static safe2 = 1;
        static #x = defineReadOnly(A, "unsafe");
        static unsafe = 3;
        static unsafe2 = 4;
      }`,
      indexes: [4, 5],
    },
    "static field after ref + side effect in public static field": {
      code: `class A {
        static safe = 2;
        static #y = 0;
        static safe2 = 1;
        static unsafe = defineReadOnly(A, "unsafe");
        static unsafe2 = 3;
        static unsafe3 = 4;
      }`,
      indexes: [3, 4, 5],
    },
    "static field after this + side effect in private static field": {
      code: `class A {
        static safe = 2;
        static #y = 0;
        static safe2 = 1;
        static #x = defineReadOnly(this, "unsafe");
        static unsafe = 3;
        static unsafe2 = 4;
      }`,
      indexes: [4, 5],
    },
    "static field after this + side effect in public static field": {
      code: `class A {
        static safe = 2;
        static #y = 0;
        static safe2 = 1;
        static unsafe = defineReadOnly(this, "unsafe");
        static unsafe2 = 3;
        static unsafe3 = 4;
      }`,
      indexes: [3, 4, 5],
    },
    "static field after side effect in private static field without refs": {
      code: `class A {
        static safe = 2;
        static #y = 0;
        static safe2 = 1;
        static #x = defineReadOnly("unsafe");
        static safe3 = 3;
      }`,
      indexes: [],
    },
    "static field after side effect in public static field without refs": {
      code: `class A {
        static safe = 2;
        static #y = 0;
        static safe2 = 1;
        static safe3 = defineReadOnly("unsafe");
        static safe4 = 3;
      }`,
      indexes: [],
    },
    "static field after refs in private static field without side-effects": {
      code: `class A {
        static safe = 2;
        static #y = 0;
        static safe2 = 1;
        static #x = A;
        static safe3 = 3;
      }`,
      indexes: [],
    },
    "static field after refs in public static field without side-effects": {
      code: `class A {
        static safe = 2;
        static #y = 0;
        static safe2 = A;
        static safe3 = 3;
      }`,
      indexes: [],
    },
    "static field after refs after side effects": {
      code: `class A {
        static safe0 = 0;
        static safe1 = sideEffect();
        static safe2 = 2;
        static unsafe3 = sideEffect(A);
        static unsafe4 = 3;
      }`,
      indexes: [3, 4],
    },
    "static field side effect after refs in computed key": {
      code: `class A {
        static safe0 = 0;
        static unsafe1 = sideEffect(getA());
        static unsage2 = 1;
        static [(getA = () => A, "unsafe3")] = 0;
      }`,
      indexes: [1, 2, 3],
    },
    "complex example": {
      code: `class A {
        static a = 0;
        b() {}
        static name = 2;
        static c = foo();
        static d() {}
        static e = 5;
        f = 6;
        static ["len" + "gth"] = 7;
        static g = 8;
        static h = doSomething(this);
        static i = 10;
        static #j = 11;
        k() {}
        static {}
        static l = 14;
        static m = 15;
        n = 16;
      }`,
      indexes: [2, 7, 9, 10, 14, 15],
    },
  };

  test.each(Object.keys(cases))("%s", name => {
    const { code, indexes } = cases[name];
    const path = classPath(code);

    expect(getPotentiallyBuggyFieldsIndexes(path)).toEqual(indexes);
  });
});

describe("getNameOrLengthStaticFieldsIndexes", () => {
  const cases = {
    "'name' static field": {
      code: `class A { static name = 2 }`,
      indexes: [0],
    },
    "'length' static field": {
      code: `class A { static length = 2 }`,
      indexes: [0],
    },
    "'name' instance field": {
      code: `class A { name = 2 }`,
      indexes: [],
    },
    "'length' instance field": {
      code: `class A { length = 2 }`,
      indexes: [],
    },
    "'#name' static field": {
      code: `class A { static #name = 2 }`,
      indexes: [],
    },
    "'#length' static field": {
      code: `class A { static #length = 2 }`,
      indexes: [],
    },
    "'name' static field after other elements": {
      code: `class A {
        foo() {}
        bar = 1;
        static baz() {}
        static name = 2
      }`,
      indexes: [3],
    },
    "'length' static field after other elements": {
      code: `class A {
        foo() {}
        bar = 1;
        static baz() {}
        static length = 2
      }`,
      indexes: [3],
    },
    "computed static field": {
      code: `class A {
        static [foo];
      }`,
      indexes: [],
    },
    "both name and length": {
      code: `class A {
        static name = 0;
        static length = 1;
      }`,
      indexes: [0, 1],
    },
  };

  test.each(Object.keys(cases))("%s", name => {
    const { code, indexes } = cases[name];
    const path = classPath(code);

    expect(getNameOrLengthStaticFieldsIndexes(path)).toEqual(indexes);
  });
});

describe("toRanges", () => {
  test.each([
    { from: [], to: [] },
    { from: [0], to: [[0, 1]] },
    { from: [10], to: [[10, 11]] },
    { from: [2, 3, 4], to: [[2, 5]] },
    {
      from: [2, 3, 6, 7, 8, 10],
      to: [
        [2, 4],
        [6, 9],
        [10, 11],
      ],
    },
  ])("$from", ({ from, to }) => {
    expect(toRanges(from)).toEqual(to);
  });
});
