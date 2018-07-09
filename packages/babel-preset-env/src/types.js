//@flow

import {
  TargetNames,
  ModulesOption,
  UseBuiltInsOption,
  TransformModeOption,
} from "./options";

// Targets
export type Target = $Keys<typeof TargetNames>;
export type Targets = {
  [target: Target]: string,
};

// Options
// Use explicit modules to prevent typo errors.
export type ModuleOption = $Values<typeof ModulesOption>;
export type BuiltInsOption = $Values<typeof UseBuiltInsOption>;
export type TransformMode = $Values<typeof TransformModeOption>;

export type Options = {
  configPath: string,
  debug: boolean,
  transformMode: TransformModeOption,
  exclude: Array<string | RegExp>,
  forceAllTransforms: boolean,
  ignoreBrowserslistConfig: boolean,
  include: Array<string | RegExp>,
  loose: boolean,
  modules: ModuleOption,
  shippedProposals: boolean,
  spec: boolean,
  targets: Targets,
  useBuiltIns: BuiltInsOption,
};

// Babel
export type Plugin = [Object, Object];
