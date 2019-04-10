import { plugins } from "./index";

export function hasPlugin(name: string): boolean {
  return plugins.has(name);
}

export function getPluginOption(plugin: string, name: boolean) {
  // $FlowIssue
  if (hasPlugin(plugin)) return plugins.get(plugin)[name];
}
