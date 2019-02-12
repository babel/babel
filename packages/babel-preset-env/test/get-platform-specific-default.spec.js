"use strict";

const getCoreJS2PlatformSpecificDefaultFor = require("../lib/polyfills/corejs2/get-platform-specific-default")
  .default;

describe("defaults", () => {
  describe("getCoreJS2PlatformSpecificDefaultFor", () => {
    it("should return web polyfills for non-`node` platform", () => {
      const defaultWebIncludesForChromeAndNode = getCoreJS2PlatformSpecificDefaultFor(
        {
          chrome: "63",
          node: "8",
        },
      );
      expect(defaultWebIncludesForChromeAndNode).toEqual([
        "web.timers",
        "web.immediate",
        "web.dom.iterable",
      ]);
    });

    it("shouldn't return web polyfills for node platform", () => {
      const defaultWebIncludesForChromeAndNode = getCoreJS2PlatformSpecificDefaultFor(
        {
          node: "8",
        },
      );
      expect(defaultWebIncludesForChromeAndNode).toBeNull();
    });
  });
});
