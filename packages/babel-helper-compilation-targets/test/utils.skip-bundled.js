import { semverify } from "../lib/utils.js";

describe("utils", () => {
  describe("semverify", () => {
    it("returns", () => {
      expect(semverify("1")).toBe("1.0.0");
      expect(semverify("1.0")).toBe("1.0.0");
      expect(semverify("1.0.0")).toBe("1.0.0");
      expect(semverify(1)).toBe("1.0.0");
      expect(semverify(1.2)).toBe("1.2.0");
    });

    it("throws", () => {
      const invalidSemver = () => {
        semverify("invalid");
      };
      expect(invalidSemver).toThrow();
    });
  });
});
