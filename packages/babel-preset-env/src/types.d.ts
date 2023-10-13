import type { ModulesOption, UseBuiltInsOption } from "./options.ts";
import type { NormalizedCorejsOption } from "./normalize-options.ts";
import type { Targets, InputTargets } from "@babel/helper-compilation-targets";

// Options
// Use explicit modules to prevent typo errors.
export type ModuleOption = (typeof ModulesOption)[keyof typeof ModulesOption];
export type BuiltInsOption =
  (typeof UseBuiltInsOption)[keyof typeof UseBuiltInsOption];

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
  modules: ModuleOption;
  shippedProposals: boolean;
  targets: {
    uglify?: boolean;
    esmodules?: boolean;
  } & InputTargets;
  useBuiltIns: BuiltInsOption;
  browserslistEnv: string;

  // TODO(Babel 8): Remove these options
  loose: boolean;
  spec: boolean;
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
