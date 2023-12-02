// TODO: Consider removing babel-plugin-polyfill-corejs3 from here, and ask
// users to explicitly enable it in their Babel configuration files.

import type { PluginAPI } from "@babel/core";
import _pluginCorejs3 from "babel-plugin-polyfill-corejs3";
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const pluginCorejs3 = (_pluginCorejs3.default ||
  _pluginCorejs3) as typeof _pluginCorejs3.default;

import type { Options } from "./index.ts";

const pluginsCompat = "#__secret_key__@babel/runtime__compatibility";

export function createCorejs3Plugin(
  corejs: Options["corejs"],
  absoluteImports: boolean,
) {
  let proposals = false;
  let rawVersion;

  if (typeof corejs === "object" && corejs !== null) {
    rawVersion = corejs.version;
    proposals = Boolean(corejs.proposals);
  } else {
    rawVersion = corejs;
  }

  if (!rawVersion) return null;

  const version = rawVersion ? Number(rawVersion) : false;

  // TODO: Allow specifying minor versions
  if (version !== 3) {
    throw new Error(
      `The \`core-js\` version must be 3, but got ${JSON.stringify(
        rawVersion,
      )}.`,
    );
  }

  return (api: PluginAPI, _: {}, filename: string) =>
    pluginCorejs3(
      api,
      {
        method: "usage-pure",
        proposals,
        absoluteImports,
        [pluginsCompat]: { useBabelRuntime: true, ext: "" },
      },
      filename,
    );
}
