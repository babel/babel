import browserslist from "browserslist";
import getTargets from "../lib/targets-parser";

describe("getTargets", () => {
  it("parses", () => {
    expect(
      getTargets({
        chrome: 49,
        firefox: "55",
        ie: "9",
        node: "6.10",
        electron: "1.6",
      }),
    ).toEqual({
      chrome: "49.0.0",
      electron: "1.6.0",
      firefox: "55.0.0",
      ie: "9.0.0",
      node: "6.10.0",
    });
  });

  it("does not clobber browserslists defaults", () => {
    const browserslistDefaults = browserslist.defaults;

    getTargets({
      browsers: "chrome 56, ie 11, firefox 51, safari 9",
    });

    expect(browserslist.defaults).toEqual(browserslistDefaults);
  });

  describe("validation", () => {
    it("throws on invalid target name", () => {
      const invalidTargetName = () => {
        getTargets({
          unknown: "unknown",
        });
      };
      expect(invalidTargetName).toThrow();
    });

    it("throws on invalid browsers target", () => {
      const invalidBrowsersTarget = () => {
        getTargets({
          browsers: 59,
        });
      };
      expect(invalidBrowsersTarget).toThrow();
    });

    it("throws on invalid target version", () => {
      const invalidTargetVersion = () => {
        getTargets({
          chrome: "unknown",
        });
      };
      expect(invalidTargetVersion).toThrow();
    });
  });

  describe("browser", () => {
    it("merges browser key targets", () => {
      expect(
        getTargets({
          browsers: "chrome 56, ie 11, firefox 51, safari 9",
          chrome: "49",
          firefox: "55",
          ie: "9",
        }),
      ).toEqual({
        chrome: "49.0.0",
        firefox: "55.0.0",
        ie: "9.0.0",
        safari: "9.0.0",
      });
    });

    it("works with TP versions", () => {
      expect(
        getTargets({
          browsers: "safari tp",
        }),
      ).toEqual({
        safari: "tp",
      });
    });

    it("works with node versions", () => {
      expect(
        getTargets({
          browsers: "node 8.5",
        }),
      ).toEqual({
        node: "8.5.0",
      });
    });

    it("works with current node version and string type browsers", () => {
      expect(
        getTargets({
          browsers: "current node, chrome 55, opera 42",
        }),
      ).toEqual({
        node: process.versions.node,
        chrome: "55.0.0",
        opera: "42.0.0",
      });
    });

    it("does throws on unsupported versions", () => {
      expect(() => {
        getTargets({
          browsers: "node 15.0.0, chrome 1000",
        });
      }).toThrow();
    });

    it("works with current node version and array type browsers", () => {
      expect(
        getTargets({
          browsers: ["ie 11", "current node", "chrome 55"],
        }),
      ).toEqual({
        node: process.versions.node,
        chrome: "55.0.0",
        ie: "11.0.0",
      });
    });

    it("prefers released version over TP", () => {
      expect(
        getTargets({
          browsers: "safari tp, safari 11",
        }),
      ).toEqual({
        safari: "11.0.0",
      });
    });

    it("returns TP version in lower case", () => {
      expect(
        getTargets({
          safari: "TP",
        }),
      ).toEqual({
        safari: "tp",
      });
    });

    it("works with android", () => {
      expect(
        getTargets({
          browsers: "Android 4",
        }),
      ).toEqual({
        android: "4.0.0",
      });
    });

    it("works with inequalities", () => {
      expect(
        getTargets({
          browsers: "Android >= 4",
        }),
      ).toEqual({
        android: "4.0.0",
      });
    });
  });

  describe("esmodules", () => {
    it("returns browsers supporting modules", () => {
      expect(
        getTargets({
          esmodules: true,
        }),
      ).toEqual({
        chrome: "61.0.0",
        safari: "10.1.0",
        firefox: "60.0.0",
        opera: "48.0.0",
        ios: "10.3.0",
        edge: "16.0.0",
      });
    });

    it("returns browsers supporting modules, ignoring browsers key", () => {
      expect(
        getTargets({
          esmodules: true,
          browsers: "ie 8",
        }),
      ).toEqual({
        chrome: "61.0.0",
        safari: "10.1.0",
        firefox: "60.0.0",
        opera: "48.0.0",
        ios: "10.3.0",
        edge: "16.0.0",
      });
    });

    it("returns browser supporting modules and keyed browser overrides", () => {
      expect(
        getTargets({
          esmodules: true,
          ie: 11,
        }),
      ).toEqual({
        chrome: "61.0.0",
        safari: "10.1.0",
        firefox: "60.0.0",
        opera: "48.0.0",
        ios: "10.3.0",
        ie: "11.0.0",
        edge: "16.0.0",
      });
    });

    it("returns browser supporting modules and keyed browser overrides, ignoring browsers field", () => {
      expect(
        getTargets({
          esmodules: true,
          browsers: "ie 10",
          ie: 11,
        }),
      ).toEqual({
        chrome: "61.0.0",
        safari: "10.1.0",
        ios: "10.3.0",
        ie: "11.0.0",
        edge: "16.0.0",
        firefox: "60.0.0",
        opera: "48.0.0",
      });
    });
  });

  describe("node", () => {
    it("should return the current node version with option 'current'", () => {
      expect(
        getTargets({
          node: true,
        }),
      ).toEqual({
        node: process.versions.node,
      });
    });
  });

  describe("electron", () => {
    it("should be its own target", () => {
      expect(
        getTargets({
          chrome: "46",
          electron: "0.34",
        }),
      ).toEqual({
        chrome: "46.0.0",
        electron: "0.34.0",
      });
    });
  });
});
