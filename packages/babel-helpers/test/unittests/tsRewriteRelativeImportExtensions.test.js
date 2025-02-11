import _tsRewriteRelativeImportExtensions from "../../lib/helpers/tsRewriteRelativeImportExtensions.js";
const tsRewriteRelativeImportExtensions =
  _tsRewriteRelativeImportExtensions.default ||
  _tsRewriteRelativeImportExtensions;

describe("tsRewriteRelativeImportExtensions", () => {
  it.each([
    // rewrite relative import
    ["./a.ts", "./a.js"],
    ["./a.cts", "./a.cjs"],
    ["./a.mts", "./a.mjs"],
    ["./a.tsx", "./a.js"],

    // rewrite relative import from parent directory
    ["../a.ts", "../a.js"],
    ["../a.cts", "../a.cjs"],
    ["../a.mts", "../a.mjs"],
    ["../a.tsx", "../a.js"],

    // rewrite transforms uppercase to lowercase
    ["./a.Ts", "./a.js"],
    ["./a.CTS", "./a.cjs"],
    ["./a.MTs", "./a.mjs"],
    ["./a.tSx", "./a.js"],

    // keep .d.css.ts
    ["./.d.css.ts", "./.d.css.ts"],
    // rewrite relative import containing .d
    ["./.d.css.cts", "./.d.css.cjs"],
    ["./.d.css.mts", "./.d.css.mjs"],
    ["./.d.css.tsx", "./.d.css.js"],

    // rewrite relative import starting with .d
    ["./.dcss.ts", "./.dcss.js"],
    ["./.dcss.cts", "./.dcss.cjs"],
    ["./.dcss.mts", "./.dcss.mjs"],
    ["./.dcss.tsx", "./.dcss.js"],

    // rewrite relative import containing .d and 3 extra extensions
    ["./.d.a.css.ts", "./.d.a.css.js"],
    ["./.d.a.css.cts", "./.d.a.css.cjs"],
    ["./.d.a.css.mts", "./.d.a.css.mjs"],
    ["./.d.a.css.tsx", "./.d.a.css.js"],

    // rewrite relative import directory containing .d
    ["./.d/.css.ts", "./.d/.css.js"],
    ["./.d/.css.cts", "./.d/.css.cjs"],
    ["./.d/.css.mts", "./.d/.css.mjs"],
    ["./.d/.css.tsx", "./.d/.css.js"],

    // skip d.ts, d.cts, and d.mts
    ["./a.d.ts", "./a.d.ts"],
    ["./a.d.cts", "./a.d.cts"],
    ["./a.d.mts", "./a.d.mts"],
    // transform d.tsx
    ["./a.d.tsx", "./a.d.js"],

    // skip bare .d.ts, .d.cts, and .d.mts
    ["./.d.ts", "./.d.ts"],
    ["./.d.cts", "./.d.cts"],
    ["./.d.mts", "./.d.mts"],
    // transform bare .d.tsx
    ["./.d.tsx", "./.d.js"],

    // skip absolute
    ["/a.ts", "/a.ts"],
    ["/a.cts", "/a.cts"],
    ["/a.mts", "/a.mts"],
    ["/a.tsx", "/a.tsx"],

    // skip library
    ["a.ts", "a.ts"],
    ["a.cts", "a.cts"],
    ["a.mts", "a.mts"],
    ["a.tsx", "a.tsx"],

    // skip dot-leading library
    [".a.ts", ".a.ts"],
    [".a.cts", ".a.cts"],
    [".a.mts", ".a.mts"],
    [".a.tsx", ".a.tsx"],

    // skip non-terminal
    ["./a.ts.foo", "./a.ts.foo"],
    ["./a.cts.foo", "./a.cts.foo"],
    ["./a.mts.foo", "./a.mts.foo"],
    ["./a.tsx.foo", "./a.tsx.foo"],

    // skip import path with windows path separator
    // Node.js ESM does not support them either
    [".\\a.ts", ".\\a.ts"],
    [".\\a.cts", ".\\a.cts"],
    [".\\a.mts", ".\\a.mts"],
    [".\\a.tsx", ".\\a.tsx"],
  ])("%p -> %p", (input, result) => {
    expect(tsRewriteRelativeImportExtensions(input)).toBe(result);
  });

  it.each([
    // skip string wrapper object
    [new String("./a.ts")],
    [new String("./a.cts")],
    [new String("./a.mts")],
    [new String("./a.tsx")],

    // skip toString() transforms
    [{ [Symbol.toStringTag]: "./a.ts" }],
    [{ [Symbol.toStringTag]: "./a.cts" }],
    [{ [Symbol.toStringTag]: "./a.mts" }],
    [{ [Symbol.toStringTag]: "./a.tsx" }],

    // skip toPrimitive() calls
    [{ [Symbol.toPrimitive]: () => "./a.ts" }],
    [{ [Symbol.toPrimitive]: () => "./a.cts" }],
    [{ [Symbol.toPrimitive]: () => "./a.mts" }],
    [{ [Symbol.toPrimitive]: () => "./a.tsx" }],
  ])("should skip %p", input => {
    expect(tsRewriteRelativeImportExtensions(input)).toBe(input);
  });
});
