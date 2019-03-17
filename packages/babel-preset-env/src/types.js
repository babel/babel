//@flow

import { ModulesOption, UseBuiltInsOption } from "./options";
import { NormalizedCorejsOption } from "./normalize-options";

// Targets
export type Target =
  | "node"
  | "chrome"
  | "opera"
  | "edge"
  | "firefox"
  | "safari"
  | "ie"
  | "ios"
  | "android"
  | "electron"
  | "samsung";

export type Targets = {
  [target: Target]: string,
};

// Options
// Use explicit modules to prevent typo errors.
export type ModuleOption = $Values<typeof ModulesOption>;
export type BuiltInsOption = $Values<typeof UseBuiltInsOption>;

type CorejsVersion = 2 | 3 | string;

export type CorejsOption =
  | false
  | CorejsVersion
  | { version: CorejsVersion, proposals: boolean };

export type PluginListItem = string | RegExp;
export type PluginListOption = Array<PluginListItem>;

export type Options = {
  configPath: string,
  corejs: CorejsOption,
  debug: boolean,
  exclude: PluginListOption,
  forceAllTransforms: boolean,
  ignoreBrowserslistConfig: boolean,
  include: PluginListOption,
  loose: boolean,
  modules: ModuleOption,
  shippedProposals: boolean,
  spec: boolean,
  targets: Targets,
  useBuiltIns: BuiltInsOption,
};

// Babel
export type Plugin = [Object, Object];

export type InternalPluginOptions = {
  corejs: NormalizedCorejsOption,
  include: Set<string>,
  exclude: Set<string>,
  polyfillTargets: Targets,
  debug: boolean,
  proposals: boolean,
  shippedProposals: boolean,
  regenerator: boolean,
};
