import env from "../lib/index.js";
import * as babel from "@babel/core";

describe("preset-env", () => {
  function extractParserOptions(api, { ref }) {
    return {
      manipulateOptions(opts, parserOpts) {
        ref.parserOpts = parserOpts;
      },
      visitor: {},
    };
  }

  it("empty test", () => {});
});
