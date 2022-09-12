import { declare } from "@babel/helper-plugin-utils";
import type { ParserPlugin } from "@babel/parser";

function removePlugin(plugins: ParserPlugin[], name: string) {
  const indices: number[] = [];
  plugins.forEach((plugin, i) => {
    const n = Array.isArray(plugin) ? plugin[0] : plugin;

    if (n === name) {
      indices.unshift(i);
    }
  });

  for (const i of indices) {
    plugins.splice(i, 1);
  }
}

export interface Options {
  disallowAmbiguousJSXLike?: boolean;
  dts?: boolean;
  isTSX?: boolean;
}

export default declare(
  (api, { disallowAmbiguousJSXLike, dts, isTSX }: Options) => {
    api.assertVersion(7);

    return {
      name: "syntax-typescript",

      manipulateOptions(opts, parserOpts) {
        const { plugins } = parserOpts;
        // If the Flow syntax plugin already ran, remove it since Typescript
        // takes priority.
        removePlugin(plugins, "flow");

        // If the JSX syntax plugin already ran, remove it because JSX handling
        // in TS depends on the extensions, and is purely dependent on 'isTSX'.
        removePlugin(plugins, "jsx");

        plugins.push(
          ["typescript", { disallowAmbiguousJSXLike, dts }],
          "classProperties",
        );

        if (!process.env.BABEL_8_BREAKING) {
          // This is enabled by default since @babel/parser 7.1.5
          plugins.push("objectRestSpread");
        }

        if (isTSX) {
          plugins.push("jsx");
        }
      },
    };
  },
);
