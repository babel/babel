import wrapRegExp from "../../helpers/wrapRegExp.js";

describe("wrapRegExp", () => {
  describe("should handle maliciously crafted substitutions", () => {
    it("$<$<...$<group", () => {
      const pattern = "(foo)";
      const groups = { group: 1 };
      const myRegExp = wrapRegExp(pattern, groups);
      const targetStr = "foofoo";
      const replacement = "$<".repeat(1e5) + "group";
      const startTime = Date.now();
      const result = myRegExp[Symbol.replace](targetStr, replacement);
      // This test will fail if 2500ms is passed
      const timeTaken = Date.now() - startTime;
      expect(timeTaken).toBeLessThan(2500);
      expect(result).toBe(replacement + "foo");
    });

    it("$<$<...$<group>", () => {
      const pattern = "(foo)";
      const groups = { group: 1 };
      const myRegExp = wrapRegExp(pattern, groups);
      const targetStr = "foofoo";
      const replacement = "$<".repeat(1e5) + "group>";
      const startTime = Date.now();
      const result = myRegExp[Symbol.replace](targetStr, replacement);
      // This test will fail if 2500ms is passed
      const timeTaken = Date.now() - startTime;
      expect(timeTaken).toBeLessThan(2500);
      expect(result).toBe("foo");
    });

    it("$<g$<g...$<group", () => {
      const pattern = "(foo)";
      const groups = { group: 1 };
      const myRegExp = wrapRegExp(pattern, groups);
      const targetStr = "foofoo";
      const replacement = "$<g".repeat(1e5) + "group";
      const startTime = Date.now();
      const result = myRegExp[Symbol.replace](targetStr, replacement);
      // This test will fail if 2500ms is passed
      const timeTaken = Date.now() - startTime;
      expect(timeTaken).toBeLessThan(2500);
      expect(result).toBe(replacement + "foo");
    });

    it("$<g$<g...$<group>", () => {
      const pattern = "(foo)";
      const groups = { group: 1 };
      const myRegExp = wrapRegExp(pattern, groups);
      const targetStr = "foofoo";
      const replacement = "$<g".repeat(1e5) + "group>";
      const startTime = Date.now();
      const result = myRegExp[Symbol.replace](targetStr, replacement);
      // This test will fail when 2500ms is passed
      const timeTaken = Date.now() - startTime;
      expect(timeTaken).toBeLessThan(2500);
      expect(result).toBe("foo");
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
