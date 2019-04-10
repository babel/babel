// @flow

export type Plugin = string | [string, Object];

export type PluginList = $ReadOnlyArray<Plugin>;

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

const PIPELINE_PROPOSALS = ["minimal", "smart"];

export function validatePlugins(plugins: PluginList) {
  if (hasPlugin(plugins, "decorators")) {
    if (hasPlugin(plugins, "decorators-legacy")) {
      throw new Error(
        "Cannot use the decorators and decorators-legacy plugin together",
      );
    }

    const decoratorsBeforeExport = getPluginOption(
      plugins,
      "decorators",
      "decoratorsBeforeExport",
    );
    if (decoratorsBeforeExport == null) {
      throw new Error(
        "The 'decorators' plugin requires a 'decoratorsBeforeExport' option," +
          " whose value must be a boolean. If you are migrating from" +
          " Babylon/Babel 6 or want to use the old decorators proposal, you" +
          " should use the 'decorators-legacy' plugin instead of 'decorators'.",
      );
    } else if (typeof decoratorsBeforeExport !== "boolean") {
      throw new Error("'decoratorsBeforeExport' must be a boolean.");
    }
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
        PIPELINE_PROPOSALS.map(p => `'${p}'`).join(", "),
    );
  }
}

export const mixinPluginNames: $ReadOnlyArray<string> = [
  "estree",
  "flow",
  "typescript",
  "jsx",
  "placeholders",
];
