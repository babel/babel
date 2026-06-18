// eslint-disable-next-line jest/no-export
export function describeIsIdentifierCharTests(isIdentifierCharImpl) {
  describe("isIdentifierChar", function () {
    it("returns false if provided codepoint is NaN", function () {
      expect(isIdentifierCharImpl(NaN)).toBe(false);
    });
    it("returns false if provided codepoint is larger than 0x10FFFF", function () {
      expect(isIdentifierCharImpl(0x110000)).toBe(false);
    });
  });
}
