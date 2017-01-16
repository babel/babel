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

    function presetThrowsTest(name, msg) {
      it(name, function () {
        const opt = new OptionManager(new Logger(null, "unknown"));
        assert.throws(() => opt.init({
          "presets": [path.join(__dirname, "fixtures/option-manager/presets", name)]
        }), msg);
      });
    }

    presetTest("es5_function");
    presetTest("es2015_default_function");

    presetThrowsTest("es5", /Expected preset to return a function./);
    presetThrowsTest("es2015_default", /Expected preset to return a function./);
    presetThrowsTest("es2015_named", /Preset must export a default export when using ES6 modules/);
    presetThrowsTest("es5_invalid", /Unsupported preset format: string/);
  });
});
