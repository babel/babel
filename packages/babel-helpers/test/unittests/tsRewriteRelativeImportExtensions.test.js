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

    // rewrite relative import containing .d
    ["./.d.a.ts", "./.d.a.ts"], // This is a bug!
    ["./.d.a.cts", "./.d.a.cjs"],
    ["./.d.a.mts", "./.d.a.mjs"],
    ["./.d.a.tsx", "./.d.a.js"],

    // skip d.ts, d.cts, and d.mts
    ["./a.d.ts", "./a.d.ts"],
    ["./a.d.cts", "./a.d.cts"],
    ["./a.d.mts", "./a.d.mts"],
    // transform d.tsx
    ["./a.d.tsx", "./a.d.js"],

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

    // skip non-terminal
    ["./a.ts.foo", "./a.ts.foo"],
    ["./a.cts.foo", "./a.cts.foo"],
    ["./a.mts.foo", "./a.mts.foo"],
    ["./a.tsx.foo", "./a.tsx.foo"],
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
