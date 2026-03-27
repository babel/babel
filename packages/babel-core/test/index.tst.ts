import { expect, it, describe } from "tstyche";
import { transformSync, defineConfig } from "../src/index.ts";
import pluginTypescript from "@babel/plugin-transform-typescript";

describe("core", () => {
  it("plugin api param", () => {
    transformSync("", {
      plugins: [
        function (api) {
          expect(api).type.toHaveProperty("types");
          return {} as any;
        },
      ],
    });
  });

  it("defineConfig", () => {
    defineConfig({
      plugins: [pluginTypescript],
    });
    defineConfig({
      plugins: ["plugin"],
    });
    defineConfig({
      plugins: [{}],
    });

    defineConfig({
      plugins: [[pluginTypescript]],
    });
    defineConfig({
      plugins: [["plugin"]],
    });
    defineConfig({
      plugins: [[{}]],
    });

    defineConfig({
      plugins: [[pluginTypescript, { isTSX: true }]],
    });
    defineConfig({
      plugins: [["plugin", { isTSX: true }]],
    });
    defineConfig({
      plugins: [[{}, { isTSX: true }]],
    });

    defineConfig({
      // @ts-expect-error Object literal may only specify known properties, and 'badOpt' does not exist in type
      plugins: [[pluginTypescript, { badOpt: true }]],
    });
    defineConfig({
      plugins: [["plugin", { badOpt: true }]],
    });
    defineConfig({
      plugins: [[{}, { badOpt: true }]],
    });

    defineConfig({
      // @ts-expect-error Object literal may only specify known properties, and 'badOpt' does not exist in type
      plugins: [[pluginTypescript, { badOpt: true }, "name"]],
    });
    defineConfig({
      plugins: [["plugin", { badOpt: true }, "name"]],
    });
    defineConfig({
      plugins: [[{}, { badOpt: true }, "name"]],
    });

    const compactPlugin = {
      default: (
        api: any,
        options: {
          isTSX?: boolean;
        },
      ) => {
        return options;
      },
    };

    defineConfig({
      plugins: [[compactPlugin, { isTSX: true }, "name"]],
    });
    defineConfig({
      // @ts-expect-error Object literal may only specify known properties, and 'badOpt' does not exist in type
      plugins: [[compactPlugin, { badOpt: true }, "name"]],
    });

    expect(1).type.toBe(1);
  });
});
