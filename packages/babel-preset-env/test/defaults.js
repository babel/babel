"use strict";

const defaults = require("../lib/defaults.js");

const {
  getPlatformSpecificDefaultFor,
  getOptionSpecificExcludesFor,
} = defaults;

describe("defaults", () => {
  describe("getPlatformSpecificDefaultFor", () => {
    it("should return web polyfills for non-`node` platform", () => {
      const defaultWebIncludesForChromeAndNode = getPlatformSpecificDefaultFor({
        chrome: "63",
        node: "8",
      });
      expect(defaultWebIncludesForChromeAndNode).toEqual([
        "web.timers",
        "web.immediate",
        "web.dom.iterable",
      ]);
    });

    it("shouldn't return web polyfills for node platform", () => {
      const defaultWebIncludesForChromeAndNode = getPlatformSpecificDefaultFor({
        node: "8",
      });
      expect(defaultWebIncludesForChromeAndNode).toBeNull();
    });
  });

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
