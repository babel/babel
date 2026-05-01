import { loadPartialConfigSync, loadPartialConfigAsync } from "../lib/index.js";
import path from "node:path";
import { commonJS } from "$repo-utils";

const { __dirname } = commonJS(import.meta.url);

describe("@babel/core config with ts", () => {
  it("should search for .cts config files", () => {
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

  it("should support .cts when available natively", () => {
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

  it("should use native TS support for .cts when available", () => {
    expect(() => {
      loadPartialConfigSync({
        configFile: path.join(
          __dirname,
          "fixtures/config-ts/simple-cts-modules/babel.config.cts",
        ),
      });
    }).toThrow(/import equals declaration is not supported in strip-only mode/);
  });

  it("should search for .ts config files", () => {
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

  it("should use native TS support for .ts (cjs) when available", () => {
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
  });

  it("should use native TS support for .ts (esm) when available", async () => {
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
  });

  it("should use native TS support for .mts when available", () => {
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

  it("should search for .mts config files", () => {
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
