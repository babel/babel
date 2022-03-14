import { OptionValidator } from "../lib/index.js";

describe("OptionValidator", () => {
  describe("validateTopLevelOptions", () => {
    let v;
    beforeAll(() => {
      v = new OptionValidator("test-descriptor");
    });
    it("should throw when option key is not found", () => {
      expect(() =>
        v.validateTopLevelOptions(
          { unknown: "options" },
          { foo: "foo" },
          "test",
        ),
      ).toThrow();
    });
    it("should throw when option key is an own property but not found", () => {
      expect(() =>
        v.validateTopLevelOptions(
          { hasOwnProperty: "foo" },
          {
            foo: "foo",
            bar: "bar",
            aLongPropertyKeyToSeeLevenPerformance: "a",
          },
          "test",
        ),
      ).toThrow();
    });
  });
  describe("validateBooleanOption", () => {
    let v;
    beforeAll(() => {
      v = new OptionValidator("test-descriptor");
    });
    it("`undefined` option returns false", () => {
      expect(v.validateBooleanOption("test", undefined, false)).toBe(false);
    });

    it("`false` option returns false", () => {
      expect(v.validateBooleanOption("test", false, false)).toBe(false);
    });

    it("`true` option returns true", () => {
      expect(v.validateBooleanOption("test", true, false)).toBe(true);
    });

    it("array option is invalid", () => {
      expect(() => {
        v.validateBooleanOption("test", [], false);
      }).toThrow();
    });
  });

  describe("validateStringOption", () => {
    let v;
    beforeAll(() => {
      v = new OptionValidator("test-descriptor");
    });
    it("`undefined` option default", () => {
      expect(v.validateStringOption("test", undefined, "default")).toBe(
        "default",
      );
    });

    it("`value` option returns value", () => {
      expect(v.validateStringOption("test", "value", "default")).toBe("value");
    });

    it("no default returns undefined", () => {
      expect(v.validateStringOption("test", undefined)).toBe(undefined);
    });

    it("array option is invalid", () => {
      expect(() => {
        v.validateStringOption("test", [], "default");
      }).toThrow();
    });
  });
});
