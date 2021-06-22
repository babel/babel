import { ModulesOption, UseBuiltInsOption } from "./options";
import type { NormalizedCorejsOption } from "./normalize-options";
import type { Targets, InputTargets } from "@babel/helper-compilation-targets";

// Options
// Use explicit modules to prevent typo errors.
export type ModuleOption = typeof ModulesOption[keyof typeof ModulesOption];
export type BuiltInsOption =
  typeof UseBuiltInsOption[keyof typeof UseBuiltInsOption];

type CorejsVersion = 2 | 3 | string;

export type CorejsOption =
  | false
  | CorejsVersion
  | {
      version: CorejsVersion;
      proposals: boolean;
    };

export type PluginListItem = string | RegExp;
export type PluginListOption = Array<PluginListItem>;

export type Options = {
  bugfixes: boolean;
  configPath: string;
  corejs: CorejsOption;
  debug: boolean;
  exclude: PluginListOption;
  forceAllTransforms: boolean;
  ignoreBrowserslistConfig: boolean;
  include: PluginListOption;
  loose: boolean;
  modules: ModuleOption;
  shippedProposals: boolean;
  spec: boolean;
  targets: {
    uglify?: boolean;
    esmodules?: boolean;
  } & InputTargets;
  useBuiltIns: BuiltInsOption;
  browserslistEnv: string;
};

// Babel
export type Plugin = [any, any];

export type InternalPluginOptions = {
  corejs: NormalizedCorejsOption;
  include: Set<string>;
  exclude: Set<string>;
  polyfillTargets: Targets;
  debug: boolean;
  proposals: boolean;
  shippedProposals: boolean;
  regenerator: boolean;
};
