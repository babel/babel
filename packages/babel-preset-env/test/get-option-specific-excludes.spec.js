import _getOptionSpecificExcludesFor from "../lib/get-option-specific-excludes.js";
const getOptionSpecificExcludesFor =
  _getOptionSpecificExcludesFor.default || _getOptionSpecificExcludesFor;

describe("defaults", () => {
  describe("getOptionSpecificExcludesFor", () => {
    it("should return correct excludes for `loose` mode", () => {
      const defaultWebIncludesForChromeAndNode = getOptionSpecificExcludesFor({
        loose: true,
      });
      expect(defaultWebIncludesForChromeAndNode).toEqual([
        "transform-typeof-symbol",
      ]);
    });

    it("shouldn't return excludes for non-`loose` mode", () => {
      const defaultWebIncludesForChromeAndNode = getOptionSpecificExcludesFor({
        loose: false,
      });
      expect(defaultWebIncludesForChromeAndNode).toBeNull();
    });
  });
});
