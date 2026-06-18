// eslint-disable-next-line jest/no-export
export function describeIsIdentifierStartTests(isIdentifierStartImpl) {
  describe("isIdentifierStart", function () {
    it("returns false if provided codepoint is NaN", function () {
      expect(isIdentifierStartImpl(NaN)).toBe(false);
    });
  });
}
