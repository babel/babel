"use strict";

const utils = require("../lib/utils");

const { prettifyTargets, prettifyVersion, semverify, findSuggestion } = utils;

describe("utils", () => {
  describe("semverify", () => {
    it("returns", () => {
      expect(semverify("1")).toBe("1.0.0");
      expect(semverify("1.0")).toBe("1.0.0");
      expect(semverify("1.0.0")).toBe("1.0.0");
      expect(semverify(1)).toBe("1.0.0");
      expect(semverify(1.2)).toBe("1.2.0");
    });

    it("throws", () => {
      const invalidSemver = () => {
        semverify("invalid");
      };
      expect(invalidSemver).toThrow();
    });
  });

  describe("prettifyVersion", () => {
    it("returns", () => {
      expect(prettifyVersion(true)).toBe(true);
      expect(prettifyVersion("0.16.0")).toBe("0.16");
      expect(prettifyVersion("1.0.0")).toBe("1");
      expect(prettifyVersion("1.1.0")).toBe("1.1");
      expect(prettifyVersion("1.0.2")).toBe("1.0.2");
      expect(prettifyVersion("1.2.3")).toBe("1.2.3");
    });
  });

  describe("prettifyTargets", () => {
    it("returns", () => {
      expect(prettifyTargets({})).toEqual({});

      expect(
        prettifyTargets({
          chrome: "54.0.0",
          electron: "1.6.0",
          node: "0.12.0",
        }),
      ).toEqual({
        chrome: "54",
        electron: "1.6",
        node: "0.12",
      });
    });
  });

  describe("findSuggestion", () => {
    it("returns", () => {
      const options = ["one", "two", "three"];
      expect(findSuggestion(options, "onr")).toEqual("one");
      expect(findSuggestion(options, "tree")).toEqual("three");
    });
  });
});
