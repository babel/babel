import Parser from "../lib/parser";

describe("plugin options", function() {
  function getNormalizedPlugins(plugins) {
    return new Parser({ plugins }, "").plugins;
  }

  it("default to {}", function() {
    expect(getNormalizedPlugins(["decorators"])).toEqual({
      decorators: {},
    });
  });

  describe("the first options are used", function() {
    it("when they aren't specified", function() {
      expect(
        getNormalizedPlugins([
          "decorators",
          ["decorators", { decoratorsBeforeExport: false }],
        ]),
      ).toEqual({
        decorators: {},
      });
    });

    it("when they are specified", function() {
      expect(
        getNormalizedPlugins([
          ["decorators", { decoratorsBeforeExport: true }],
          ["decorators", { decoratorsBeforeExport: false }],
        ]),
      ).toEqual({
        decorators: { decoratorsBeforeExport: true },
      });
    });
  });
});
