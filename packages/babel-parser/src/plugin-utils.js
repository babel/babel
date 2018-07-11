// @flow

import type Parser from "./parser";

export type Plugin = string | [string, Object];

export type PluginList = $ReadOnlyArray<Plugin>;

export type MixinPlugin = (superClass: Class<Parser>) => Class<Parser>;

export function hasPlugin(plugins: PluginList, name: string): boolean {
  return plugins.some(plugin => {
    if (Array.isArray(plugin)) {
      return plugin[0] === name;
    } else {
      return plugin === name;
    }
  });
}

export function getPluginOption(
  plugins: PluginList,
  name: string,
  option: string,
) {
  const plugin = plugins.find(plugin => {
    if (Array.isArray(plugin)) {
      return plugin[0] === name;
    } else {
      return plugin === name;
    }
  });

  if (plugin && Array.isArray(plugin)) {
    return plugin[1][option];
  }

  return null;
}

const PIPELINE_PROPOSALS = ["minimal"];

export function validatePlugins(plugins: PluginList) {
  if (
    hasPlugin(plugins, "decorators") &&
    hasPlugin(plugins, "decorators-legacy")
  ) {
    throw new Error(
      "Cannot use the decorators and decorators-legacy plugin together",
    );
  }

  if (hasPlugin(plugins, "flow") && hasPlugin(plugins, "typescript")) {
    throw new Error("Cannot combine flow and typescript plugins.");
  }

  if (
    hasPlugin(plugins, "pipelineOperator") &&
    !PIPELINE_PROPOSALS.includes(
      getPluginOption(plugins, "pipelineOperator", "proposal"),
    )
  ) {
    throw new Error(
      "'pipelineOperator' requires 'proposal' option whose value should be one of: " +
        PIPELINE_PROPOSALS.join(", "),
    );
  }
}

// These plugins are defined using a mixin which extends the parser class.

import estree from "./plugins/estree";
import flow from "./plugins/flow";
import jsx from "./plugins/jsx";
import typescript from "./plugins/typescript";

// NOTE: estree must load first; flow and typescript must load last.
export const mixinPluginNames = ["estree", "jsx", "flow", "typescript"];
export const mixinPlugins: { [name: string]: MixinPlugin } = {
  estree,
  jsx,
  flow,
  typescript,
};
