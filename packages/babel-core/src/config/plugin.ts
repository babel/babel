import { finalize } from "./helpers/deep-array.ts";
import type { ReadonlyDeepArray } from "./helpers/deep-array.ts";
import type { PluginObject } from "./validation/plugins.ts";

const PluginSortSymbol = Symbol.for("Babel-internal/plugin.sort");

export default class Plugin {
  origin: PluginObject;
  key: string | undefined | null;
  manipulateOptions?: PluginObject["manipulateOptions"];
  post?: PluginObject["post"];
  pre?: PluginObject["pre"];
  sort?: (plugins: Plugin[]) => Plugin[];
  visitor: PluginObject["visitor"];

  parserOverride?: PluginObject["parserOverride"];
  generatorOverride?: PluginObject["generatorOverride"];

  options: object;

  externalDependencies: ReadonlyDeepArray<string>;

  constructor(
    plugin: PluginObject,
    options: object,
    key?: string,
    externalDependencies: ReadonlyDeepArray<string> = finalize([]),
  ) {
    this.origin = plugin;
    this.key = plugin.name || key;

    this.manipulateOptions = plugin.manipulateOptions;
    this.post = plugin.post;
    this.pre = plugin.pre;
    this.sort = (plugin as any)[PluginSortSymbol];
    this.visitor = plugin.visitor || {};
    this.parserOverride = plugin.parserOverride;
    this.generatorOverride = plugin.generatorOverride;

    this.options = options;
    this.externalDependencies = externalDependencies;
  }
}
