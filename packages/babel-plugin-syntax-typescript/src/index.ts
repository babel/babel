import { declare } from "@babel/helper-plugin-utils";

if (!process.env.BABEL_8_BREAKING) {
  // eslint-disable-next-line no-var
  var removePlugin = function (plugins: any[], name: string) {
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
  };
}

export interface Options {
  disallowAmbiguousJSXLike?: boolean;
  dts?: boolean;
  isTSX?: boolean;
}

export default declare((api, opts: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const { disallowAmbiguousJSXLike, dts } = opts;

  if (!process.env.BABEL_8_BREAKING) {
    // eslint-disable-next-line no-var
    var { isTSX } = opts;
  }

  return {
    name: "syntax-typescript",

    manipulateOptions(opts, parserOpts) {
      if (!process.env.BABEL_8_BREAKING) {
        const { plugins } = parserOpts;
        // If the Flow syntax plugin already ran, remove it since Typescript
        // takes priority.
        removePlugin(plugins, "flow");

        // If the JSX syntax plugin already ran, remove it because JSX handling
        // in TS depends on the extensions, and is purely dependent on 'isTSX'.
        removePlugin(plugins, "jsx");

        if (!process.env.BABEL_8_BREAKING) {
          // These are now enabled by default in @babel/parser, but we push
          // them for compat with older versions.
          // @ts-ignore(Babel 7 vs Babel 8) These plugins have been removed
          plugins.push("objectRestSpread", "classProperties");
        }

        if (isTSX) {
          plugins.push("jsx");
        }
      }

      parserOpts.plugins.push([
        "typescript",
        { disallowAmbiguousJSXLike, dts },
      ]);
    },
  };
});
