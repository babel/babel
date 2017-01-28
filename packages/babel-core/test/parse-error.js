import { assert } from "chai";
import buildConfigChain from "../lib/transformation/file/options/build-config-chain";

describe("parse error", function () {

  it("should show a code frame if parse error", () => {

    try {
      new buildConfigChain({
        filename: "./parse-error/babelrc"
      });

      throw new Error("Config parse error doesn\'t throw an error");
    } catch (e) {

      const expected = [
        "  1 | {",
        "> 2 |     plugins: [ 'test'' ]",
        "    |                      ^",
        "  3 | }",
        "  4 |"
      ];

      assert.include(e.message, expected.join("\n"));
    }
  });

});
