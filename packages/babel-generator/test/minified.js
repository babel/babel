import runRoundtripTests from "./helpers/roundtrip.js";

describe("minified roundtrip", () => {
  runRoundtripTests(
    { minified: true },
    {
      parserFailures: [
        // `("use strict");` is printed as a directive, but the `"\5"` that
        // follows is printed as `"\x05"`, which strict mode accepts
        "core/categorized/not-directive/input.js",
      ],
      parserReparseErrors: [
        // The `^^` topic token is printed next to the `^` operator
        "experimental/pipeline-operator-hack/hack-double-caret-proposal-xor-topic-first-with-spaces/input.js",
        "experimental/pipeline-operator-hack/hack-double-caret-proposal-xor-topic-last-with-spaces/input.js",
      ],
    },
  );
});
