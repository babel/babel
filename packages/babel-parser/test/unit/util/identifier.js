import {
  isKeyword,
  keywordRelationalOperator,
} from "../../../src/util/identifier";

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

  describe("keywordRelationalOperator", () => {
    it("in is true", () => {
      expect(keywordRelationalOperator.test("in")).toBe(true);
    });
    it("instanceof is true", () => {
      expect(keywordRelationalOperator.test("instanceof")).toBe(true);
    });
    it("stanceof is false", () => {
      expect(keywordRelationalOperator.test("stanceof")).toBe(false);
    });
    it("instance is false", () => {
      expect(keywordRelationalOperator.test("instance")).toBe(false);
    });
    it("abc is false", () => {
      expect(keywordRelationalOperator.test("abc")).toBe(false);
    });
  });
});
