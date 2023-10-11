import {
  loadOptions,
  loadOptionsSync,
  loadOptionsAsync,
  loadPartialConfig,
  loadPartialConfigAsync,
  loadPartialConfigSync,
  createConfigItem,
  createConfigItemSync,
} from "../lib/index.js";
import path from "path";
import { itNoWin32, itBabel8, commonJS } from "$repo-utils";
import { supportsESM } from "./helpers/esm.js";

const { require, __dirname } = commonJS(import.meta.url);

describe("@babel/core config loading", () => {
  const FILEPATH = path.join(
    __dirname,
    "fixtures",
    "config-loading",
    "folder",
    "example.js",
  );

  afterEach(() => {
    delete process.env.INVALIDATE_BABELRC;
    delete process.env.INVALIDATE_PRESET1;
    delete process.env.INVALIDATE_PRESET2;
    delete process.env.INVALIDATE_PRESET3;
    delete process.env.INVALIDATE_PLUGIN1;
    delete process.env.INVALIDATE_PLUGIN2;
    delete process.env.INVALIDATE_PLUGIN3;
    delete process.env.INVALIDATE_PLUGIN4;
    delete process.env.INVALIDATE_PLUGIN5;
    delete process.env.INVALIDATE_PLUGIN6;
  });

  function makeOpts(skipProgrammatic = false) {
    return {
      cwd: path.dirname(FILEPATH),
      filename: FILEPATH,
      presets: skipProgrammatic
        ? null
        : [[require("./fixtures/config-loading/preset3.js"), {}]],
      plugins: skipProgrammatic
        ? null
        : [[require("./fixtures/config-loading/plugin6.js"), {}]],
    };
  }

  describe("createConfigItem", () => {
    itBabel8("throws on undefined callback", () => {
      function myPlugin() {
        return {};
      }
      expect(() =>
        createConfigItem(myPlugin),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Starting from Babel 8.0.0, the 'createConfigItem' function expects a callback. If you need to call it synchronously, please use 'createConfigItemSync'."`,
      );
    });
  });

  describe("createConfigItemSync", () => {
    // Windows uses different file paths
    itNoWin32("can be called synchronously with one param", () => {
      function myPlugin() {
        return {};
      }

      expect(createConfigItemSync(myPlugin)).toEqual({
        dirname: process.cwd(),
        file: undefined,
        name: undefined,
        options: undefined,
        value: myPlugin,
      });
    });

    itNoWin32("can be called synchronously with two params", () => {
      function myPlugin() {
        return {};
      }

      expect(
        createConfigItemSync(myPlugin, { dirname: "/foo", type: "plugin" }),
      ).toEqual({
        dirname: "/foo",
        file: undefined,
        name: undefined,
        options: undefined,
        value: myPlugin,
      });
    });
  });

  describe("loadPartialConfig", () => {
    itBabel8("throws on undefined callback", () => {
      expect(() =>
        loadPartialConfig({
          ...makeOpts(true),
          babelrc: false,
          configFile: false,
        }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Starting from Babel 8.0.0, the 'loadPartialConfig' function expects a callback. If you need to call it synchronously, please use 'loadPartialConfigSync'."`,
      );
    });
  });

  describe("loadPartialConfigSync", () => {
    it("should preserve disabled plugins in the partial config", () => {
      const plugin = function () {
        return {};
      };

      const opts = loadPartialConfigSync({
        ...makeOpts(true),
        babelrc: false,
        configFile: false,
        plugins: [[plugin, false]],
      });

      expect(opts.options.plugins.length).toBe(1);
      const item = opts.options.plugins[0];

      expect(item.value).toBe(plugin);
      expect(item.options).toBe(false);
    });

    it("should preserve disabled presets in the partial config", () => {
      const preset = function () {
        return {};
      };

      const opts = loadPartialConfigSync({
        ...makeOpts(true),
        babelrc: false,
        configFile: false,
        presets: [[preset, false]],
      });

      expect(opts.options.presets.length).toBe(1);
      const item = opts.options.presets[0];

      expect(item.value).toBe(preset);
      expect(item.options).toBe(false);
    });

    it("should always set 'rootMode' to 'root'", async () => {
      const cwd = path.join(
        __dirname,
        "fixtures",
        "config-loading",
        "root",
        "nested",
      );

      const { options } = loadPartialConfigSync({
        cwd,
        filename: path.join(cwd, "file.js"),
        rootMode: "upward",
      });

      expect(options.root).toBe(path.join(cwd, ".."));
      expect(options.rootMode).toBe("root");
    });
  });

  describe("loadPartialConfigAsync", () => {
    // https://github.com/babel/babel/issues/15916
    (supportsESM ? it : it.skip)(
      "two calls in parallel loading the same ESM config",
      async () => {
        const cwd = path.join(
          __dirname,
          "fixtures",
          "config",
          "config-files",
          "babel-config-mjs-object",
        );

        const [config1, config2] = await Promise.all([
          loadPartialConfigAsync({
            cwd,
            filename: path.join(cwd, "./a.js"),
          }),
          loadPartialConfigAsync({
            cwd,
            filename: path.join(cwd, "./b.js"),
          }),
        ]);

        // eslint-disable-next-line jest/no-standalone-expect
        expect(config1.options.plugins).toEqual(config2.options.plugins);
      },
    );
  });

  describe("loadOptions", () => {
    itBabel8("throws on undefined callback", () => {
      const opts = makeOpts();

      expect(() => loadOptions(opts)).toThrowErrorMatchingInlineSnapshot(
        `"Starting from Babel 8.0.0, the 'loadOptions' function expects a callback. If you need to call it synchronously, please use 'loadOptionsSync'."`,
      );
    });
  });

  describe("loadOptionsSync", () => {
    it("should load and cache the config with plugins and presets", () => {
      const opts = makeOpts();

      const options1 = loadOptionsSync(opts);
      expect(options1.plugins.map(p => p.key)).toEqual([
        "plugin1",
        "plugin2",
        "plugin6",
        "plugin5",
        "plugin4",
        "plugin3",
      ]);

      const options2 = loadOptionsSync(opts);
      expect(options2.plugins.length).toBe(options1.plugins.length);

      for (let i = 0; i < options2.plugins.length; i++) {
        expect(options2.plugins[i]).toBe(options1.plugins[i]);
      }
    });

    it("should load and cache the config for unique opts objects", () => {
      const options1 = loadOptionsSync(makeOpts(true));
      expect(options1.plugins.map(p => p.key)).toEqual([
        "plugin1",
        "plugin2",
        "plugin4",
        "plugin3",
      ]);

      const options2 = loadOptionsSync(makeOpts(true));
      expect(options2.plugins.length).toBe(options1.plugins.length);

      for (let i = 0; i < options2.plugins.length; i++) {
        expect(options2.plugins[i]).toBe(options1.plugins[i]);
      }
    });

    it("should invalidate config file plugins", () => {
      const opts = makeOpts();

      const options1 = loadOptionsSync(opts);

      process.env.INVALIDATE_PLUGIN1 = true;

      const options2 = loadOptionsSync(opts);
      expect(options2.plugins.length).toBe(options1.plugins.length);

      expect(options2.plugins[0]).not.toBe(options1.plugins[0]);
      for (let i = 1; i < options1.plugins.length; i++) {
        expect(options2.plugins[i]).toBe(options1.plugins[i]);
      }

      process.env.INVALIDATE_PLUGIN3 = true;

      const options3 = loadOptionsSync(opts);
      expect(options3.plugins.length).toBe(options1.plugins.length);
      expect(options3.plugins.length).toBe(6);
      expect(options3.plugins[0]).not.toBe(options1.plugins[0]);
      expect(options3.plugins[5]).not.toBe(options1.plugins[5]);
      for (let i = 1; i < 5; i++) {
        expect(options3.plugins[i]).toBe(options1.plugins[i]);
      }
    });

    it("should invalidate config file presets and their children", () => {
      const opts = makeOpts();

      const options1 = loadOptionsSync(opts);

      process.env.INVALIDATE_PRESET1 = true;

      const options2 = loadOptionsSync(opts);
      expect(options2.plugins.length).toBe(options1.plugins.length);
      expect(options2.plugins.length).toBe(6);
      expect(options2.plugins[5]).not.toBe(options1.plugins[5]);
      for (let i = 0; i < 5; i++) {
        expect(options2.plugins[i]).toBe(options1.plugins[i]);
      }

      process.env.INVALIDATE_PRESET2 = true;

      const options3 = loadOptionsSync(opts);
      expect(options3.plugins.length).toBe(options1.plugins.length);
      expect(options3.plugins.length).toBe(6);
      expect(options3.plugins[4]).not.toBe(options1.plugins[4]);
      expect(options3.plugins[5]).not.toBe(options1.plugins[5]);
      for (let i = 0; i < 4; i++) {
        expect(options3.plugins[i]).toBe(options1.plugins[i]);
      }
    });

    it("should invalidate the config file and its plugins/presets", () => {
      const opts = makeOpts();

      const options1 = loadOptionsSync(opts);

      process.env.INVALIDATE_BABELRC = true;

      const options2 = loadOptionsSync(opts);
      expect(options2.plugins.length).toBe(options1.plugins.length);
      expect(options2.plugins.length).toBe(6);
      expect(options2.plugins[0]).not.toBe(options1.plugins[0]);
      expect(options2.plugins[1]).not.toBe(options1.plugins[1]);
      expect(options2.plugins[4]).not.toBe(options1.plugins[4]);
      expect(options2.plugins[5]).not.toBe(options1.plugins[5]);

      expect(options2.plugins[2]).toBe(options1.plugins[2]);
      expect(options2.plugins[3]).toBe(options1.plugins[3]);
    });
  });

  describe("loadOptionsAsync", () => {
    it("should load and cache the config with plugins and presets when executed in parallel", async () => {
      const opts = makeOpts();

      const [options1, options2] = await Promise.all([
        loadOptionsAsync(opts),
        loadOptionsAsync(opts),
      ]);
      expect(options1.plugins.map(p => p.key)).toEqual([
        "plugin1",
        "plugin2",
        "plugin6",
        "plugin5",
        "plugin4",
        "plugin3",
      ]);

      expect(options2.plugins.length).toBe(options1.plugins.length);

      for (let i = 0; i < options2.plugins.length; i++) {
        expect(options2.plugins[i]).toBe(options1.plugins[i]);
      }
    });
  });

  describe("programmatic plugins/presets", () => {
    it("should not invalidate the plugins when given a fresh object", () => {
      const opts = makeOpts();

      const options1 = loadOptionsSync(opts);

      const options2 = loadOptionsSync(Object.assign({}, opts));
      expect(options2.plugins.length).toBe(options1.plugins.length);

      for (let i = 0; i < options2.plugins.length; i++) {
        expect(options2.plugins[i]).toBe(options1.plugins[i]);
      }
    });

    it("should not invalidate the plugins when given a fresh arrays", () => {
      const opts = makeOpts();

      const options1 = loadOptionsSync(opts);

      const options2 = loadOptionsSync({
        ...opts,
        plugins: opts.plugins.slice(),
      });
      expect(options2.plugins.length).toBe(options1.plugins.length);

      for (let i = 0; i < options2.plugins.length; i++) {
        expect(options2.plugins[i]).toBe(options1.plugins[i]);
      }
    });

    it("should not invalidate the presets when given a fresh arrays", () => {
      const opts = makeOpts();

      const options1 = loadOptionsSync(opts);

      const options2 = loadOptionsSync({
        ...opts,
        presets: opts.presets.slice(),
      });
      expect(options2.plugins.length).toBe(options1.plugins.length);

      for (let i = 0; i < options2.plugins.length; i++) {
        expect(options2.plugins[i]).toBe(options1.plugins[i]);
      }
    });

    it("should invalidate the plugins when given a fresh options", () => {
      const opts = makeOpts();

      const options1 = loadOptionsSync(opts);

      const options2 = loadOptionsSync({
        ...opts,
        plugins: opts.plugins.map(([plg, opt]) => [plg, { ...opt }]),
      });
      expect(options2.plugins.length).toBe(options1.plugins.length);
      expect(options2.plugins.length).toBe(6);

      expect(options2.plugins[2]).not.toBe(options1.plugins[2]);

      expect(options2.plugins[0]).toBe(options1.plugins[0]);
      expect(options2.plugins[1]).toBe(options1.plugins[1]);
      expect(options2.plugins[3]).toBe(options1.plugins[3]);
      expect(options2.plugins[4]).toBe(options1.plugins[4]);
      expect(options2.plugins[5]).toBe(options1.plugins[5]);
    });

    it("should invalidate the presets when given a fresh options", () => {
      const opts = makeOpts();

      const options1 = loadOptionsSync(opts);

      const options2 = loadOptionsSync({
        ...opts,
        presets: opts.presets.map(([plg, opt]) => [plg, { ...opt }]),
      });
      expect(options2.plugins.length).toBe(options1.plugins.length);
      expect(options2.plugins.length).toBe(6);

      expect(options2.plugins[3]).not.toBe(options1.plugins[3]);

      expect(options2.plugins[0]).toBe(options1.plugins[0]);
      expect(options2.plugins[1]).toBe(options1.plugins[1]);
      expect(options2.plugins[2]).toBe(options1.plugins[2]);
      expect(options2.plugins[4]).toBe(options1.plugins[4]);
      expect(options2.plugins[5]).toBe(options1.plugins[5]);
    });

    it("should invalidate the programmatic plugins", () => {
      const opts = makeOpts();

      const options1 = loadOptionsSync(opts);

      process.env.INVALIDATE_PLUGIN6 = true;

      const options2 = loadOptionsSync(opts);
      expect(options2.plugins.length).toBe(options1.plugins.length);
      expect(options2.plugins.length).toBe(6);

      expect(options2.plugins[2]).not.toBe(options1.plugins[2]);

      expect(options2.plugins[0]).toBe(options1.plugins[0]);
      expect(options2.plugins[1]).toBe(options1.plugins[1]);
      expect(options2.plugins[3]).toBe(options1.plugins[3]);
      expect(options2.plugins[4]).toBe(options1.plugins[4]);
      expect(options2.plugins[5]).toBe(options1.plugins[5]);
    });

    it("should invalidate the programmatic presets and their children", () => {
      const opts = makeOpts();

      const options1 = loadOptionsSync(opts);

      process.env.INVALIDATE_PRESET3 = true;

      const options2 = loadOptionsSync(opts);
      expect(options2.plugins.length).toBe(options1.plugins.length);
      expect(options2.plugins.length).toBe(6);

      expect(options2.plugins[3]).not.toBe(options1.plugins[3]);

      expect(options2.plugins[0]).toBe(options1.plugins[0]);
      expect(options2.plugins[1]).toBe(options1.plugins[1]);
      expect(options2.plugins[2]).toBe(options1.plugins[2]);
      expect(options2.plugins[4]).toBe(options1.plugins[4]);
      expect(options2.plugins[5]).toBe(options1.plugins[5]);
    });

    it("should thrown when plugin is not valid", () => {
      const fooPlugin = {
        inherits: "inherits-should-not-be-string",
      };
      const opts = {
        cwd: path.dirname(FILEPATH),
        filename: FILEPATH,
        plugins: [fooPlugin],
      };

      expect(() => loadOptionsSync(opts)).toThrow(
        /\.inherits must be a function, or undefined/,
      );
    });

    it("should throw when plugin contains `enter` handler", () => {
      const fooPlugin = {
        visitor: {
          enter() {},
        },
      };
      const opts = {
        cwd: path.dirname(FILEPATH),
        filename: FILEPATH,
        plugins: [fooPlugin],
      };

      expect(() => loadOptionsSync(opts)).toThrow(
        /\.visitor cannot contain catch-all "enter" or "exit" handlers\. Please target individual nodes\./,
      );
    });
  });

  describe("caller metadata", () => {
    it("should pass caller data through", () => {
      const options1 = loadOptionsSync({
        ...makeOpts(),
        caller: {
          name: "babel-test",
          someFlag: true,
        },
      });

      expect(options1.caller.name).toBe("babel-test");
      expect(options1.caller.someFlag).toBe(true);
    });

    it("should pass unknown caller data through", () => {
      const options1 = loadOptionsSync({
        ...makeOpts(),
        caller: undefined,
      });

      expect(options1.caller).toBeUndefined();
    });

    it("should pass caller data to test functions", () => {
      const options1 = loadOptionsSync({
        ...makeOpts(),
        caller: {
          name: "babel-test",
          someFlag: true,
        },
        overrides: [
          {
            test: (filename, { caller }) => caller.name === "babel-test",
            comments: false,
          },
          {
            test: (filename, { caller }) => caller.name !== "babel-test",
            ast: false,
          },
        ],
      });

      expect(options1.comments).toBe(false);
      expect(options1.ast).not.toBe(false);
    });
  });
});
