// eslint-disable-next-line jest/no-export
export function describeIsIdentifierNameTests(isIdentifierNameImpl) {
  describe("isIdentifierName", function () {
    it("returns false if provided string is empty", function () {
      expect(isIdentifierNameImpl("")).toBe(false);
    });
    it.each([
      "hello",
      "$",
      "ゆゆ式",
      "$20",
      "hello20",
      "_",
      "if",
      "_\u200c",
      "_\u200d",
    ])(
      "returns true if provided string %p is an IdentifierName",
      function (word) {
        expect(isIdentifierNameImpl(word)).toBe(true);
      },
    );
    it.each(["+hello", "0$", "-ゆゆ式", "#_", "_#", "\ud800\ud800"])(
      "returns false if provided string %p is not an IdentifierName",
      function (word) {
        expect(isIdentifierNameImpl(word)).toBe(false);
      },
    );
    it("supports astral symbols", function () {
      expect(isIdentifierNameImpl("x\uDB40\uDDD5")).toBe(true);
    });
    it("supports Unicode 17.0", () => {
      // BMP ID_Start
      expect(isIdentifierNameImpl("\u{0c5c}")).toBe(true);
      expect(isIdentifierNameImpl("_\u{0c5c}")).toBe(true);
      // BMP ID_Continue
      expect(isIdentifierNameImpl("_\u{1acf}")).toBe(true);

      // SMP ID_Start
      expect(isIdentifierNameImpl("\u{10940}")).toBe(true);
      expect(isIdentifierNameImpl("_\u{10940}")).toBe(true);

      // SMP ID_Continue
      expect(isIdentifierNameImpl("_\u{10efa}")).toBe(true);

      // UTF16 encoding of U+10940 = D802 DD40
      expect(isIdentifierNameImpl("\uD802")).toBe(false);
      expect(isIdentifierNameImpl("_\uDD40")).toBe(false);
    });
    it("supports Unicode 16.0", () => {
      // BMP ID_Start
      expect(isIdentifierNameImpl("\u{1c89}")).toBe(true);
      expect(isIdentifierNameImpl("_\u{1c89}")).toBe(true);
      // BMP ID_Continue
      expect(isIdentifierNameImpl("_\u{0897}")).toBe(true);

      // SMP ID_Start
      expect(isIdentifierNameImpl("\u{105c0}")).toBe(true);
      expect(isIdentifierNameImpl("_\u{105c0}")).toBe(true);

      // SMP ID_Continue
      expect(isIdentifierNameImpl("_\u{10d40}")).toBe(true);

      // UTF16 encoding of U+105c0 = D801 DDC0
      expect(isIdentifierNameImpl("\uD801")).toBe(false);
      expect(isIdentifierNameImpl("_\uDDC0")).toBe(false);
    });
    it("supports Unicode 15.1", () => {
      expect(isIdentifierNameImpl("\u{2ebf0}")).toBe(true);
    });
    it("supports Unicode 15", () => {
      expect(isIdentifierNameImpl("\u{1e030}")).toBe(true);
    });
    it("supports Unicode 14", () => {
      expect(isIdentifierNameImpl("\u{10f70}")).toBe(true);
    });
    it("supports Unicode 13", () => {
      expect(isIdentifierNameImpl("\u{30000}")).toBe(true);
    });
    it("supports Unicode 12", () => {
      expect(isIdentifierNameImpl("\u{10fe0}")).toBe(true);
    });
    it("supports Unicode 11", () => {
      expect(isIdentifierNameImpl("\u{10f00}")).toBe(true);
    });
  });
}
