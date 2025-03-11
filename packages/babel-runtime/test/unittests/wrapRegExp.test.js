import wrapRegExp from "../../helpers/esm/wrapRegExp.js";

describe("wrapRegExp", () => {
  it("should handle maliciously crafted substitutions", () => {
    const pattern = "(foo)";
    const groups = { group: 1 };
    const myRegExp = wrapRegExp(pattern, groups);
    const targetStr = "foofoo";
    const str = "$<".repeat(1e5) + "group";
    const startTime = Date.now();
    myRegExp[Symbol.replace](targetStr, str);
    // This test will fail when 1000ms is passed
    const timeTaken = Date.now() - startTime;
    expect(timeTaken).toBeLessThan(1000);
  });
});
