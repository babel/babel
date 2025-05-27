import { finalize } from "./helpers/deep-array.ts";
import type { ReadonlyDeepArray } from "./helpers/deep-array.ts";
import type { PluginObject } from "./validation/plugins.ts";

export default class Plugin {
  key: string | undefined | null;
  manipulateOptions?: (options: unknown, parserOpts: unknown) => void;
  post?: PluginObject["post"];
  pre?: PluginObject["pre"];
  visitor: PluginObject["visitor"];

  parserOverride?: PluginObject["parserOverride"];
  generatorOverride?: Function;

  options: object;

  externalDependencies: ReadonlyDeepArray<string>;

  constructor(
    plugin: PluginObject,
    options: object,
    key?: string,
    externalDependencies: ReadonlyDeepArray<string> = finalize([]),
  ) {
    this.key = plugin.name || key;

    this.manipulateOptions = plugin.manipulateOptions;
    this.post = plugin.post;
    this.pre = plugin.pre;
    this.visitor = plugin.visitor || {};
    this.parserOverride = plugin.parserOverride;
    this.generatorOverride = plugin.generatorOverride;

    this.options = options;
    this.externalDependencies = externalDependencies;
  }
}
