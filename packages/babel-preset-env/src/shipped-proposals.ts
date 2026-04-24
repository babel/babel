/* eslint sort-keys: "error" */
// These mappings represent the transform plugins that have been
// shipped by browsers, and are enabled by the `shippedProposals` option.

const proposalPlugins = new Set<string>([]);

// proposal syntax plugins enabled by the `shippedProposals` option.
// Unlike proposalPlugins above, they are independent of compiler targets.
const proposalSyntaxPlugins = [] as const;
// use intermediary object to enforce alphabetical key order
const pluginSyntaxObject: Record<string, string> = {};

const pluginSyntaxEntries = Object.keys(pluginSyntaxObject).map<
  [string, string | null]
>(function (key: string) {
  return [key, pluginSyntaxObject[key]];
});

const pluginSyntaxMap = new Map(pluginSyntaxEntries);

export { proposalPlugins, proposalSyntaxPlugins, pluginSyntaxMap };
