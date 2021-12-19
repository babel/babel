import type { PluginObject } from "./validation/plugins";
import ReadonlySet from "./helpers/readonly-set";

export default class Plugin {
  key: string | undefined | null;
  manipulateOptions?: (options: unknown, parserOpts: unknown) => void;
  post?: Function;
  pre?: Function;
  visitor: {};

  parserOverride?: Function;
  generatorOverride?: Function;

  options: {};

  externalDependencies: ReadonlySet<string>;

  constructor(
    plugin: PluginObject,
    options: {},
    key?: string,
    externalDependencies: Set<string> = new Set(),
  ) {
    this.key = plugin.name || key;

    this.manipulateOptions = plugin.manipulateOptions;
    this.post = plugin.post;
    this.pre = plugin.pre;
    this.visitor = plugin.visitor || {};
    this.parserOverride = plugin.parserOverride;
    this.generatorOverride = plugin.generatorOverride;

    this.options = options;

    this.externalDependencies = new ReadonlySet(externalDependencies);
  }
}
