import { isIdentifierName } from "..";

describe("isIdentifierName", function () {
  it("returns false if provided string is empty", function () {
    expect(isIdentifierName("")).toBe(false);
  });
  it.each(["hello", "$", "ゆゆ式", "$20", "hello20", "_", "if"])(
    "returns true if provided string %p is an IdentifierName",
    function (word) {
      expect(isIdentifierName(word)).toBe(true);
    },
  );
  it.each(["+hello", "0$", "-ゆゆ式", "#_", "_#"])(
    "returns false if provided string %p is not an IdentifierName",
    function (word) {
      expect(isIdentifierName(word)).toBe(false);
    },
  );
  it("supports astral symbols", function () {
    expect(isIdentifierName("x\uDB40\uDDD5")).toBe(true);
  });
});
