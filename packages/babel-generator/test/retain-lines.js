import runRoundtripTests from "./helpers/roundtrip.js";

describe("retainLines roundtrip", () => {
  runRoundtripTests(
    { retainLines: true },
    {
      generatorFailures: [
        // `>` of a tag that ends on a later line is printed early, so the
        // newline that brings the next child to its line is added to JSXText
        "types/JSXFragment-JSXOpeningFragment-JSXClosingFragment/input.js",
      ],
      parserFailures: [
        // `>` of a tag that ends on a later line is printed early, so the
        // newline that brings the next child to its line is added to JSXText
        "jsx/basic/fragment-5/input.js",
      ],
      parserPasses: [
        // A single arrow parameter keeps its parentheses with retainLines, so
        // `a ? b : (c) => d` is not read as `b` with a return type
        "typescript/conditional/arrow-return-type-async-invalid-params/input.ts",
        "typescript/conditional/arrow-return-type-body-invalid-params/input.ts",
        "typescript/conditional/arrow-return-type-body-invalid-params-error-recovery-false/input.ts",
        "typescript/conditional/arrow-return-type-valid-error-recovery-false/input.ts",
      ],
    },
  );
});
