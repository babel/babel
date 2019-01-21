import { isKeyword } from "../../../src/util/identifier";

describe("identifier", () => {
  describe("isKeyword", () => {
    it("break is a keyword", () => {
      expect(isKeyword("break")).toBe(true);
    });
    it("let is a keyword", () => {
      expect(isKeyword("let")).toBe(true);
    });
    it("super is a keyword", () => {
      expect(isKeyword("super")).toBe(true);
    });
    it("abc is not a keyword", () => {
      expect(isKeyword("abc")).toBe(false);
    });
  });
});
