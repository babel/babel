import path from "path";
import { fileURLToPath } from "url";
import * as babel from "../lib/index.js";

const cwd = path.dirname(fileURLToPath(import.meta.url));

function transformSync(code, opts) {
  return babel.transformSync(code, { cwd, configFile: false, ...opts });
}

function loadPartialConfigSync(opts) {
  return babel.loadPartialConfigSync({ cwd, configFile: false, ...opts });
}

describe("internal plugins", () => {
  describe("transform", () => {
    it("basic behavior", () => {
      expect(
        transformSync("() => {}", {
          plugins: ["internal:transform-arrow-functions"],
        }).code,
      ).toMatchInlineSnapshot(`"(function () {});"`);
    });

    it("@babel/plugin-proposal-... renamed to transform-", () => {
      expect(
        transformSync("a?.b", {
          plugins: ["internal:transform-optional-chaining"],
        }).code,
      ).toMatchInlineSnapshot(`
        "var _a;

        (_a = a) === null || _a === void 0 ? void 0 : _a.b;"
      `);
    });

    it("unknown internal plugins throw an error", () => {
      expect(() =>
        transformSync("() => {}", {
          plugins: ["internal:transform-goats"],
        }),
      ).toThrow(/Unknown internal plugin: transform-goats/);
    });

    it("unknown internal presets throw an error", () => {
      expect(() =>
        transformSync("() => {}", {
          presets: ["internal:goats"],
        }),
      ).toThrow(/Unknown internal preset: goats/);
    });
  });

  describe("loadPartialConfig", () => {
    it("basic behavior", () => {
      const opts = { foo: true };
      expect(
        loadPartialConfigSync({
          plugins: [["internal:transform-arrow-functions", opts, "a name"]],
        }).options.plugins[0],
      ).toMatchObject({
        value: "internal:transform-arrow-functions",
        name: "a name",
        options: opts,
      });
    });

    it("unknown internal plugins throw an error", () => {
      expect(() =>
        loadPartialConfigSync({
          plugins: ["internal:transform-goats"],
        }),
      ).toThrow(/Unknown internal plugin: transform-goats/);
    });

    it("unknown internal presets throw an error", () => {
      expect(() =>
        loadPartialConfigSync({
          presets: ["internal:goats"],
        }),
      ).toThrow(/Unknown internal preset: goats/);
    });
  });
});
