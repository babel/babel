//@flow

import { TargetNames, ModulesOption, UseBuiltInsOption } from "./options";

// Targets
export type Target = $Keys<typeof TargetNames>;
export type Targets = {
  [target: Target]: string,
};

// Options
// Use explicit modules to prevent typo errors.
export type ModuleOption = $Values<typeof ModulesOption>;
export type BuiltInsOption = $Values<typeof UseBuiltInsOption>;

export type Options = {
  configPath: string,
  corejs: any,
  debug: boolean,
  exclude: Array<string | RegExp>,
  forceAllTransforms: boolean,
  ignoreBrowserslistConfig: boolean,
  include: Array<string | RegExp>,
  loose: boolean,
  modules: ModuleOption,
  proposals: boolean,
  shippedProposals: boolean,
  spec: boolean,
  targets: Targets,
  useBuiltIns: BuiltInsOption,
};

// Babel
export type Plugin = [Object, Object];
