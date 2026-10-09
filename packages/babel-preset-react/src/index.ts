import { declarePreset } from "@babel/helper-plugin-utils";
import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformReactJSXDevelopment from "@babel/plugin-transform-react-jsx-development";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactPure from "@babel/plugin-transform-react-pure-annotations";
import normalizeOptions from "./normalize-options.ts";
import type { PluginItem } from "@babel/core";

export interface Options {
  development?: boolean;
  developmentSourceSelf?: boolean;
  importSource?: string;
  pragma?: string;
  pragmaFrag?: string;
  pure?: string;
  runtime?: "automatic" | "classic";
  throwIfNamespace?: boolean;
}

export default declarePreset((api, opts: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  const {
    development = api.env(env => env === "development"),
    developmentSourceSelf,
    importSource,
    pragma,
    pragmaFrag,
    pure,
    runtime,
    throwIfNamespace,
  } = normalizeOptions(opts);

  const pluginOptios = {
    importSource,
    pragma,
    pragmaFrag,
    runtime,
    throwIfNamespace,
    pure,
  };

  return {
    plugins: [
      development
        ? [
            transformReactJSXDevelopment,
            { ...pluginOptios, sourceSelf: developmentSourceSelf },
          ]
        : [transformReactJSX, pluginOptios],
      transformReactDisplayName,
      pure !== false && transformReactPure,
    ].filter(Boolean) as PluginItem[],
  };
});
