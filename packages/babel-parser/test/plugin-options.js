import { parse } from "../lib";

function getParser(code, plugins) {
  return () => parse(code, { plugins, sourceType: "module" });
}

describe("plugin options", function() {
  describe("the first options are used", function() {
    // NOTE: This test is not specific about decorators, it can be applied
    // to any plugin with options.

    const NAME = "decorators";
    const OPT_1 = [NAME, { decoratorsBeforeExport: true }];
    const OPT_2 = [NAME, { decoratorsBeforeExport: false }];
    const SYNTAX_1 = "@dec export class C {}";
    const SYNTAX_2 = "export @dec class C {}";
    const SYNTAX_DEFAULT = "export @dec class C {}";

    it("when they aren't specified", function() {
      expect(getParser(SYNTAX_DEFAULT, [NAME, OPT_1])).not.toThrow();
      expect(getParser(SYNTAX_DEFAULT, [NAME, OPT_2])).not.toThrow();
    });

    it("when they are specified", function() {
      expect(getParser(SYNTAX_1, [OPT_1, OPT_2])).not.toThrow();
      expect(getParser(SYNTAX_2, [OPT_2, OPT_1])).not.toThrow();
      expect(getParser(SYNTAX_1, [OPT_2, OPT_1])).toThrow();
      expect(getParser(SYNTAX_2, [OPT_1, OPT_2])).toThrow();
    });
  });
});
