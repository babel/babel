import { itBabel8 } from "$repo-utils";
import * as t from "../../../lib/index.js";

describe("builders", function () {
  describe("core", function () {
    describe("regexLiteral", function () {
      it("should set default flags to empty string", function () {
        expect(t.regExpLiteral("test")).toHaveProperty("flags", "");
      });
      it.each(["d", "g", "i", "m", "s", "u", "v", "y"])(
        "should accept flags: %s",
        function (flags) {
          expect(t.regExpLiteral("test", flags)).toHaveProperty("flags", flags);
        },
      );
      itBabel8("should reject invalid flags", function () {
        expect(() => t.regExpLiteral("test", "a")).toThrow(
          '"a" is not a valid RegExp flag',
        );
      });
      itBabel8("should print the first invalid flags", function () {
        expect(() => t.regExpLiteral("test", "def")).toThrow(
          '"e" is not a valid RegExp flag',
        );
      });
    });
  });
});
