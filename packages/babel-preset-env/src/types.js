//@flow

import { ModulesOption, UseBuiltInsOption } from "./options";
import type { NormalizedCorejsOption } from "./normalize-options";
import type { Targets } from "@babel/helper-compilation-targets";

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
