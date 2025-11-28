// TODO(Babel 8): Remove this file
/* eslint sort-keys: "error" */
// These mappings represent the transform plugins that have been
// shipped by browsers, and are enabled by the `shippedProposals` option.

const proposalPlugins = new Set<string>([]);

// proposal syntax plugins enabled by the `shippedProposals` option.
// Unlike proposalPlugins above, they are independent of compiler targets.
const proposalSyntaxPlugins = [] as const;
// use intermediary object to enforce alphabetical key order
const pluginSyntaxObject = {};

type PluginSyntaxObjectKeys = keyof typeof pluginSyntaxObject;

const pluginSyntaxEntries = Object.keys(pluginSyntaxObject).map<
  [PluginSyntaxObjectKeys, string | null]
>(function (key: PluginSyntaxObjectKeys) {
  return [key, pluginSyntaxObject[key]];
});

const pluginSyntaxMap = new Map(pluginSyntaxEntries);

export { proposalPlugins, proposalSyntaxPlugins, pluginSyntaxMap };
