import type { PluginObject } from "@babel/core";
import { isLessThan } from "verkit";
import { recordArgumentsUsage } from "@babel/plugin-transform-parameters";

import {
  enableFeature,
  getResolvedOptions,
  type FeatureOptions,
} from "./features.ts";
import { buildDestructuringVisitor, type Guard } from "./visitors.ts";

export { FEATURES } from "./features.ts";
export { buildObjectExcludingKeys, unshiftForXStatementBody } from "./util.ts";

const versionKey = "@babel/plugin-destructuring/version";

export interface Options {
  name: string;
  feature: number;
  options?: FeatureOptions;
  manipulateOptions?: PluginObject["manipulateOptions"];
}

/**
 * Create a plugin lowering destructuring-related syntax. Several plugins
 * created by this factory can be enabled at the same time: they share a
 * single lowering pass, configured with the union of their features.
 */
export function createDestructuringPlugin({
  name,
  feature,
  options = {},
  manipulateOptions,
}: Options): PluginObject {
  // Only the newest helper copy lowers, with the union of the features
  // enabled by all the plugins, including the ones using an older copy.
  const guard: Guard = handler => (path, state) => {
    if (state.file.get(versionKey) === PACKAGE_JSON.version) {
      handler(path, state, getResolvedOptions(state.file));
    }
  };

  return {
    name,
    manipulateOptions,

    pre(file) {
      enableFeature(file, feature, options);
      recordArgumentsUsage(file);

      if (
        !file.get(versionKey) ||
        isLessThan(file.get(versionKey), PACKAGE_JSON.version)
      ) {
        file.set(versionKey, PACKAGE_JSON.version);
      }
    },

    visitor: buildDestructuringVisitor(guard),
  };
}
