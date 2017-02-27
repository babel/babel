import assert from "assert";
import OptionManager from "../lib/transformation/file/options/option-manager";
import Logger from "../lib/transformation/file/logger";
import path from "path";

describe("option-manager", () => {
  describe("memoisePluginContainer", () => {
    it("throws for babel 5 plugin", () => {
      return assert.throws(
        () => OptionManager.memoisePluginContainer(({ Plugin }) => new Plugin("object-assign", {})),
        /Babel 5 plugin is being run with Babel 6/
      );
    });
  });

  describe("mergeOptions", () => {
    it("throws for removed babel 5 options", () => {
      return assert.throws(
        () => {
          const opt = new OptionManager(new Logger(null, "unknown"));
          opt.init({
            "randomOption": true
          });
        },
        /Unknown option: base.randomOption/
      );
    });

    it("throws for removed babel 5 options", () => {
      return assert.throws(
        () => {
          const opt = new OptionManager(new Logger(null, "unknown"));
          opt.init({
            "auxiliaryComment": true,
            "blacklist": true
          });
        },
        // eslint-disable-next-line max-len
        /Using removed Babel 5 option: base.auxiliaryComment - Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`/
      );
    });

    it("throws for resolved but erroring preset", () => {
      return assert.throws(
        () => {
          const opt = new OptionManager(new Logger(null, "unknown"));
          opt.init({
            "presets": [path.join(__dirname, "fixtures/option-manager/not-a-preset")]
          });
        },
        /While processing preset: .*option-manager(?:\/|\\\\)not-a-preset\.js/
      );
    });

    it("throws for invalid preset configuration", function() {
      return assert.throws(
        function () {
          const opt = new OptionManager(new Logger(null, "unknown"));
          opt.init({
            "presets": [{ option: "value" }]
          });
        },
        // eslint-disable-next-line max-len
        /Unknown option: foreign.option\.(?:.|\n)+A common cause of this error is the presence of a configuration options object without the corresponding preset name/
      );
    });
  });

  describe("presets", function () {
    function presetTest(name) {
      it(name, function () {
        const opt = new OptionManager(new Logger(null, "unknown"));
        const options = opt.init({
          "presets": [path.join(__dirname, "fixtures/option-manager/presets", name)]
        });

        assert.equal(true, Array.isArray(options.plugins));
        assert.equal(1, options.plugins.length);
      });
    }

    presetTest("es5");
    presetTest("es5_function");
    presetTest("es2015_default");
    presetTest("es2015_default_function");
    presetTest("es2015_default_object_function");
    presetTest("es2015_function");
    presetTest("es2015_function_fallback");
    presetTest("es2015_named");

  });
});
