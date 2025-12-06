import { loadPartialConfigSync, loadPartialConfigAsync } from "../lib/index.js";
import path from "node:path";
import { commonJS, itSatisfies, itNegate } from "$repo-utils";

const { __dirname, require } = commonJS(import.meta.url);

// Node.js 23.6/22.18 unflags --experimental-strip-types
const itStripTypes = itSatisfies("^22.18.0 || >=23.6.0");
const itNoStripTypes = itNegate(itStripTypes);

describe("@babel/core config with ts", () => {
  itNoStripTypes("should transpile .cts when needed", () => {
    const config = loadPartialConfigSync({
      configFile: path.join(
        __dirname,
        "fixtures/config-ts/simple-cts-modules/babel.config.cts",
      ),
    });

    // eslint-disable-next-line jest/no-standalone-expect
    expect(config.options.targets).toMatchInlineSnapshot(`
        Object {
          "node": "12.0.0",
        }
      `);

    // eslint-disable-next-line jest/no-standalone-expect
    expect(config.options.sourceRoot).toMatchInlineSnapshot(`"/a/b"`);
  });

  // Node.js >=23.6 has builtin .ts register, so this test can be removed
  // when we dropped Node.js 23 support in the future
  itNoStripTypes("should throw with invalid .cts register", () => {
    const oldHook = require.extensions[".cts"];
    require.extensions[".cts"] = () => {
      throw new Error("Scary!");
    };
    try {
      expect(() => {
        loadPartialConfigSync({
          configFile: path.join(
            __dirname,
            "fixtures/config-ts/invalid-cts-register/babel.config.cts",
          ),
        });
      }).toThrow(/Scary!/);
    } finally {
      require.extensions[".cts"] = oldHook;
    }
  });

  // This isn't by design, but reflects the status quo when running in Node.js
  // versions that don't have native support for .ts files.
  // It can be changed if needed.
  itNoStripTypes("should not support .ts config file", () => {
    expect(() => {
      loadPartialConfigSync({
        configFile: path.join(
          __dirname,
          "fixtures/config-ts/simple-ts-cjs/babel.config.ts",
        ),
      });
    }).toThrow(
      /You are using a .ts config file, but Babel only supports transpiling .cts configs/,
    );
  });

  itNoStripTypes("should search .ts config file and throw", () => {
    expect(() => {
      loadPartialConfigSync({
        root: path.join(__dirname, "fixtures/config-ts/simple-ts-cjs"),
      });
    }).toThrow(
      /You are using a .ts config file, but Babel only supports transpiling .cts configs/,
    );
  });

  itStripTypes("should search for .cts config files", () => {
    const config = loadPartialConfigSync({
      root: path.join(__dirname, "fixtures/config-ts/simple-cts-no-modules"),
    });

    expect(config.options.targets).toMatchInlineSnapshot(`
        Object {
          "node": "12.0.0",
        }
      `);

    expect(config.options.sourceRoot).toMatchInlineSnapshot(`"/a/b"`);
  });

  itStripTypes("should support .cts when available natively", () => {
    const config = loadPartialConfigSync({
      configFile: path.join(
        __dirname,
        "fixtures/config-ts/simple-cts-no-modules/babel.config.cts",
      ),
    });

    expect(config.options.targets).toMatchInlineSnapshot(`
      Object {
        "node": "12.0.0",
      }
    `);

    expect(config.options.sourceRoot).toMatchInlineSnapshot(`"/a/b"`);
  });

  itStripTypes("should use native TS support for .cts when available", () => {
    expect(() => {
      loadPartialConfigSync({
        configFile: path.join(
          __dirname,
          "fixtures/config-ts/simple-cts-modules/babel.config.cts",
        ),
      });
    }).toThrow(/import equals declaration is not supported in strip-only mode/);
  });

  itStripTypes("should search for .ts config files", () => {
    const config = loadPartialConfigSync({
      root: path.join(__dirname, "fixtures/config-ts/simple-ts-cjs"),
    });

    expect(config.options.targets).toMatchInlineSnapshot(`
        Object {
          "node": "12.0.0",
        }
      `);

    expect(config.options.sourceRoot).toMatchInlineSnapshot(`"/a/b"`);
  });

  itStripTypes(
    "should use native TS support for .ts (cjs) when available",
    () => {
      const config = loadPartialConfigSync({
        configFile: path.join(
          __dirname,
          "fixtures/config-ts/simple-ts-cjs/babel.config.ts",
        ),
      });

      expect(config.options.targets).toMatchInlineSnapshot(`
        Object {
          "node": "12.0.0",
        }
      `);

      expect(config.options.sourceRoot).toMatchInlineSnapshot(`"/a/b"`);
    },
  );

  itStripTypes(
    "should use native TS support for .ts (esm) when available",
    async () => {
      const config = await loadPartialConfigAsync({
        configFile: path.join(
          __dirname,
          "fixtures/config-ts/simple-ts-esm/babel.config.ts",
        ),
      });

      expect(config.options.targets).toMatchInlineSnapshot(`
        Object {
          "node": "12.0.0",
        }
      `);

      expect(config.options.sourceRoot).toMatchInlineSnapshot(`"/a/b"`);
    },
  );

  itNoStripTypes("should search .mts config file and throw", () => {
    expect(() => {
      loadPartialConfigSync({
        root: path.join(__dirname, "fixtures/config-ts/simple-mts-modules"),
      });
    }).toThrow(
      /You are using a .mts config file, but Babel only supports transpiling .cts configs/,
    );
  });

  itStripTypes("should use native TS support for .mts when available", () => {
    const config = loadPartialConfigSync({
      configFile: path.join(
        __dirname,
        "fixtures/config-ts/simple-mts-modules/babel.config.mts",
      ),
    });

    expect(config.options.targets).toMatchInlineSnapshot(`
        Object {
          "node": "12.0.0",
        }
      `);

    expect(config.options.sourceRoot).toMatchInlineSnapshot(`"/a/b"`);
  });

  itStripTypes("should search for .mts config files", () => {
    const config = loadPartialConfigSync({
      root: path.join(__dirname, "fixtures/config-ts/simple-mts-modules"),
    });

    expect(config.options.targets).toMatchInlineSnapshot(`
        Object {
          "node": "12.0.0",
        }
      `);

    expect(config.options.sourceRoot).toMatchInlineSnapshot(`"/a/b"`);
  });
});
