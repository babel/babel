import { declarePreset } from "@babel/helper-plugin-utils";
import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformReactJSXDevelopment from "@babel/plugin-transform-react-jsx-development";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactPure from "@babel/plugin-transform-react-pure-annotations";
import normalizeOptions from "./normalize-options.ts";
import type { PluginItem } from "../../babel-core/src/config/validation/options.ts";

export interface Options {
  development?: boolean;
  importSource?: string;
  pragma?: string;
  pragmaFrag?: string;
  pure?: string;
  runtime?: "automatic" | "classic";
  throwIfNamespace?: boolean;
  useBuiltIns?: boolean;
  useSpread?: boolean;
}

export default declarePreset((api, opts: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const {
    development = process.env.BABEL_8_BREAKING
      ? api.env(env => env === "development")
      : false,
    importSource,
    pragma,
    pragmaFrag,
    pure,
    runtime,
    throwIfNamespace,
  } = normalizeOptions(opts);

  return {
    plugins: [
      [
        development ? transformReactJSXDevelopment : transformReactJSX,
        process.env.BABEL_8_BREAKING
          ? {
              importSource,
              pragma,
              pragmaFrag,
              runtime,
              throwIfNamespace,
              pure,
            }
          : {
              importSource,
              pragma,
              pragmaFrag,
              runtime,
              throwIfNamespace,
              pure,
              useBuiltIns: !!opts.useBuiltIns,
              useSpread: opts.useSpread,
            },
      ] satisfies PluginItem,
      transformReactDisplayName,
      pure !== false && transformReactPure,
    ].filter(Boolean),
  };
});
