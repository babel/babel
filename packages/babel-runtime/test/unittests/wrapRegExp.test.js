import wrapRegExp from "../../helpers/wrapRegExp.js";

describe("wrapRegExp", () => {
  describe("should handle maliciously crafted substitutions", () => {
    // The target string does not match, so the native replace never expands
    // the substitution and only the helper's own `$<name>` rewriting is
    // timed. V8's native expansion of an unterminated `$<` is itself
    // quadratic, which made a matching target flaky on slow machines.
    it.each([
      ["$<$<...$<group", "$<".repeat(1e5) + "group"],
      ["$<g$<g...$<group", "$<g".repeat(1e5) + "group"],
    ])("%s", (_, replacement) => {
      const myRegExp = wrapRegExp("(foo)", { group: 1 });
      const startTime = Date.now();
      const result = myRegExp[Symbol.replace]("bar", replacement);
      // The quadratic regex fixed in #17173 takes ~30s here, the fixed one <1ms.
      const timeTaken = Date.now() - startTime;
      expect(timeTaken).toBeLessThan(2500);
      expect(result).toBe("bar");
    });

    it.each([
      ["$<$<$<group", "$<$<$<groupfoo"],
      ["$<$<$<group>", "foo"],
      ["$<g$<g$<group", "$<g$<g$<groupfoo"],
      ["$<g$<g$<group>", "foo"],
    ])("%s", (replacement, expected) => {
      const myRegExp = wrapRegExp("(foo)", { group: 1 });
      const result = myRegExp[Symbol.replace]("foofoo", replacement);
      expect(result).toBe(expected);
    });

    it("$<_$>", () => {
      const pattern = "(foo)";
      const groups = { _$: 1 };
      const myRegExp = wrapRegExp(pattern, groups);
      const targetStr = "foobar";
      const replacement = "$<_$>$<_$>";
      const result = myRegExp[Symbol.replace](targetStr, replacement);
      expect(result).toBe("foofoobar");
    });

    it("$<hasOwnProperty>", () => {
      const pattern = "(foo)";
      const groups = { hasOwnProperty: 1 };
      const myRegExp = wrapRegExp(pattern, groups);
      const targetStr = "foobar";
      const replacement = "$<hasOwnProperty>";
      const result = myRegExp[Symbol.replace](targetStr, replacement);
      expect(result).toBe("foobar");
    });

    it("$<__proto__>", () => {
      const pattern = "(foo)";
      const groups = { ["__proto__"]: 1 };
      const myRegExp = wrapRegExp(pattern, groups);
      const targetStr = "foobar";
      const replacement = "$<__proto__>";
      const result = myRegExp[Symbol.replace](targetStr, replacement);
      expect(result).toBe("foobar");
    });
  });
  describe("substitutions", () => {
    it("unknown group", () => {
      const pattern = "(foo)";
      const groups = { group: 1 };
      const myRegExp = wrapRegExp(pattern, groups);
      const targetStr = "foobar";
      const replacement = "$<UNKNOWN>";
      const result = myRegExp[Symbol.replace](targetStr, replacement);
      expect(result).toBe("bar");
    });

    it("$<hasOwnProperty> - unknown group", () => {
      const pattern = "(foo)";
      const groups = { group: 1 };
      const myRegExp = wrapRegExp(pattern, groups);
      const targetStr = "foobar";
      const replacement = "$<hasOwnProperty>";
      const result = myRegExp[Symbol.replace](targetStr, replacement);
      expect(result).toBe("bar");
    });

    it("$<__proto__> -- unknown group", () => {
      const pattern = "(foo)";
      const groups = { group: 1 };
      const myRegExp = wrapRegExp(pattern, groups);
      const targetStr = "foobar";
      const replacement = "$<__proto__>";
      const result = myRegExp[Symbol.replace](targetStr, replacement);
      expect(result).toBe("bar");
    });
  });
});
