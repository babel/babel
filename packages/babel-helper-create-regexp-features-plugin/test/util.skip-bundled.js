import { generateRegexpuOptions } from "../lib/util.js";

describe("generateRegexpuOptions", () => {
  describe("should handle maliciously crafted pattern", () => {
    it("\\(?<\\(?<...", () => {
      const pattern = "" + new RegExp("\\(?<".repeat(4e4));
      const startTime = Date.now();
      const options = generateRegexpuOptions(pattern, 0);
      const timeTaken = Date.now() - startTime;
      expect(timeTaken).toBeLessThan(2000);
      expect(options).toHaveProperty("namedGroups", false);
    });
  });
});
