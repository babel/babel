import assert from "assert";
import manageOptions from "../lib/config/option-manager";
import path from "path";

describe("option-manager", () => {
  it("throws for babel 5 plugin", () => {
    return assert.throws(() => {
      manageOptions({
        plugins: [({ Plugin }) => new Plugin("object-assign", {})],
      });
    }, /Babel 5 plugin is being run with an unsupported Babel/);
  });

  describe("config plugin/preset flattening and overriding", () => {
    function makePlugin() {
      const calls = [];
      const plugin = (api, opts) => {
        calls.push(opts);
        return {};
      };
      return { plugin, calls };
    }

    it("should throw if a plugin is repeated", () => {
      const { calls, plugin } = makePlugin();

      assert.throws(() => {
        manageOptions({
          plugins: [plugin, plugin],
        });
      }, /Duplicate plugin\/preset detected/);
      assert.deepEqual(calls, []);
    });

    it("should not throw if a repeated plugin has a different name", () => {
      const { calls: calls1, plugin: plugin1 } = makePlugin();
      const { calls: calls2, plugin: plugin2 } = makePlugin();

      manageOptions({
        plugins: [[plugin1, { arg: 1 }], [plugin2, { arg: 2 }, "some-name"]],
      });
      assert.deepEqual(calls1, [{ arg: 1 }]);
      assert.deepEqual(calls2, [{ arg: 2 }]);
    });

    it("should merge .env[] plugins with parent presets", () => {
      const { calls: calls1, plugin: plugin1 } = makePlugin();
      const { calls: calls2, plugin: plugin2 } = makePlugin();

      manageOptions({
        envName: "test",
        plugins: [[plugin1, { arg: 1 }]],
        env: {
          test: {
            plugins: [[plugin1, { arg: 3 }], [plugin2, { arg: 2 }]],
          },
        },
      });
      assert.deepEqual(calls1, [{ arg: 3 }]);
      assert.deepEqual(calls2, [{ arg: 2 }]);
    });

    it("should throw if a preset is repeated", () => {
      const { calls, plugin: preset } = makePlugin();

      assert.throws(() => {
        manageOptions({
          presets: [preset, preset],
        });
      }, /Duplicate plugin\/preset detected/);
      assert.deepEqual(calls, []);
    });

    it("should not throw if a repeated preset has a different name", () => {
      const { calls: calls1, plugin: preset1 } = makePlugin();
      const { calls: calls2, plugin: preset2 } = makePlugin();

      manageOptions({
        presets: [[preset1, { arg: 1 }], [preset2, { arg: 2 }, "some-name"]],
      });
      assert.deepEqual(calls1, [{ arg: 1 }]);
      assert.deepEqual(calls2, [{ arg: 2 }]);
    });

    it("should merge .env[] presets with parent presets", () => {
      const { calls: calls1, plugin: preset1 } = makePlugin();
      const { calls: calls2, plugin: preset2 } = makePlugin();

      manageOptions({
        envName: "test",
        presets: [[preset1, { arg: 1 }]],
        env: {
          test: {
            presets: [[preset1, { arg: 3 }], [preset2, { arg: 2 }]],
          },
        },
      });
      assert.deepEqual(calls1, [{ arg: 3 }]);
      assert.deepEqual(calls2, [{ arg: 2 }]);
    });

    it("should not merge .env[] presets with parent presets when passPerPreset", () => {
      const { calls: calls1, plugin: preset1 } = makePlugin();
      const { calls: calls2, plugin: preset2 } = makePlugin();

      manageOptions({
        envName: "test",
        passPerPreset: true,
        presets: [[preset1, { arg: 1 }]],
        env: {
          test: {
            presets: [[preset1, { arg: 3 }], [preset2, { arg: 2 }]],
          },
        },
      });
      assert.deepEqual(calls1, [{ arg: 1 }, { arg: 3 }]);
      assert.deepEqual(calls2, [{ arg: 2 }]);
    });
  });

  describe("mergeOptions", () => {
    it("throws for removed babel 5 options", () => {
      return assert.throws(() => {
        manageOptions({
          randomOption: true,
        });
      }, /Unknown option: .randomOption/);
    });

    it("throws for removed babel 5 options", () => {
      return assert.throws(
        () => {
          manageOptions({
            auxiliaryComment: true,
            blacklist: true,
          });
        },
        // eslint-disable-next-line max-len
        /Using removed Babel 5 option: .auxiliaryComment - Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`/,
      );
    });

    it("throws for resolved but erroring preset", () => {
      return assert.throws(() => {
        manageOptions({
          presets: [
            path.join(__dirname, "fixtures/option-manager/not-a-preset"),
          ],
        });
      }, /While processing: .*option-manager(?:\/|\\\\)not-a-preset\.js/);
    });
  });

  describe("presets", function() {
    function presetTest(name) {
      it(name, function() {
        const { options, passes } = manageOptions({
          presets: [
            path.join(__dirname, "fixtures/option-manager/presets", name),
          ],
        });

        assert.equal(true, Array.isArray(options.plugins));
        assert.equal(1, options.plugins.length);
        assert.equal(1, passes.length);
        assert.equal(1, passes[0].length);
      });
    }

    function presetThrowsTest(name, msg) {
      it(name, function() {
        assert.throws(
          () =>
            manageOptions({
              presets: [
                path.join(__dirname, "fixtures/option-manager/presets", name),
              ],
            }),
          msg,
        );
      });
    }

    presetTest("es5_function");
    presetTest("es5_object");
    presetTest("es2015_default_function");
    presetTest("es2015_default_object");

    presetThrowsTest(
      "es2015_named",
      /Must export a default export when using ES6 modules/,
    );
    presetThrowsTest("es2015_invalid", /Unsupported format: string/);
    presetThrowsTest("es5_invalid", /Unsupported format: string/);
  });
});
