import { isKeyword } from "../../../lib/util/identifier.js";

describe("identifier", () => {
  describe("isKeyword", () => {
    it("break is a keyword", () => {
      expect(isKeyword("break")).toBe(true);
    });
    it("const is a keyword", () => {
      expect(isKeyword("const")).toBe(true);
    });
    it("super is a keyword", () => {
      expect(isKeyword("super")).toBe(true);
    });
    it("let is not a keyword", () => {
      expect(isKeyword("let")).toBe(false);
    });
    it("abc is not a keyword", () => {
      expect(isKeyword("abc")).toBe(false);
    });
  });
});
