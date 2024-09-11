import { isIdentifierName } from "../lib/index.js";

describe("isIdentifierName", function () {
  it("returns false if provided string is empty", function () {
    expect(isIdentifierName("")).toBe(false);
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
      expect(isIdentifierName(word)).toBe(true);
    },
  );
  it.each(["+hello", "0$", "-ゆゆ式", "#_", "_#", "\ud800\ud800"])(
    "returns false if provided string %p is not an IdentifierName",
    function (word) {
      expect(isIdentifierName(word)).toBe(false);
    },
  );
  it("supports astral symbols", function () {
    expect(isIdentifierName("x\uDB40\uDDD5")).toBe(true);
  });
  it("supports Unicode 16.0", () => {
    expect(isIdentifierName("\u{105c0}")).toBe(true);
  });
  it("supports Unicode 15.1", () => {
    expect(isIdentifierName("\u{2ebf0}")).toBe(true);
  });
  it("supports Unicode 15", () => {
    expect(isIdentifierName("\u{1e030}")).toBe(true);
  });
  it("supports Unicode 14", () => {
    expect(isIdentifierName("\u{10f70}")).toBe(true);
  });
  it("supports Unicode 13", () => {
    expect(isIdentifierName("\u{30000}")).toBe(true);
  });
  it("supports Unicode 12", () => {
    expect(isIdentifierName("\u{10fe0}")).toBe(true);
  });
  it("supports Unicode 11", () => {
    expect(isIdentifierName("\u{10f00}")).toBe(true);
  });
});
