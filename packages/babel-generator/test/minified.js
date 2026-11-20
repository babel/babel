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
    },
  );
});
