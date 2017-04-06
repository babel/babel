export default function getPossiblePluginNames(pluginName: string): Array<string> {
  return [`babel-plugin-${pluginName}`, pluginName];
}
