import { declarePreset } from "@babel/helper-plugin-utils";
import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformReactJSXDevelopment from "@babel/plugin-transform-react-jsx-development";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactPure from "@babel/plugin-transform-react-pure-annotations";
import normalizeOptions from "./normalize-options.ts";
import type { PluginItem } from "@babel/core";

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
    development = api.env(env => env === "development"),
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

        {
          importSource,
          pragma,
          pragmaFrag,
          runtime,
          throwIfNamespace,
          pure,
        },
      ] satisfies PluginItem,
      transformReactDisplayName,
      pure !== false && transformReactPure,
    ].filter(Boolean),
  };
});
