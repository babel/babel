import runRoundtripTests from "./helpers/roundtrip.js";

describe("minified roundtrip", () => {
  runRoundtripTests(
    { minified: true },
    {
      generatorFailures: [
        // JSX attribute strings are printed with backslash escapes, which JSX
        // does not support
        "types/JSXAttribute/input.js",
      ],
      generatorReparseErrors: [
        // `declare module.exports: T` is not followed by a semicolon
        "flow/declare-statements/input.js",
      ],
      parserFailures: [
        // `("use strict");` is printed as a directive, but the `"\5"` that
        // follows is printed as `"\x05"`, which strict mode accepts
        "core/categorized/not-directive/input.js",

        // JSX attribute strings are printed with backslash escapes, which JSX
        // does not support
        "jsx/regression/7/input.js",
        "jsx/regression/issue-2114/input.js",
      ],
      parserReparseErrors: [
        // The `^^` topic token is printed next to the `^` operator
        "experimental/pipeline-operator-hack/hack-double-caret-proposal-xor-topic-first-with-spaces/input.js",
        "experimental/pipeline-operator-hack/hack-double-caret-proposal-xor-topic-last-with-spaces/input.js",
      ],
    },
  );
});
