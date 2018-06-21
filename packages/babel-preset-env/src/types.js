//@flow

import { TargetNames, ModulesOption, PolyfillsOption } from "./options";

// Targets
export type Target = $Keys<typeof TargetNames>;
export type Targets = {
  [target: Target]: string,
};

// Options
// Use explicit modules to prevent typo errors.
export type ModuleOption = $Values<typeof ModulesOption>;
export type PolyfillOption = $Values<typeof PolyfillsOption>;

export type Options = {
  configPath: string,
  debug: boolean,
  exclude: Array<string | RegExp>,
  forceAllTransforms: boolean,
  ignoreBrowserslistConfig: boolean,
  include: Array<string | RegExp>,
  loose: boolean,
  modules: ModuleOption,
  shippedProposals: boolean,
  spec: boolean,
  targets: Targets,
  useBuiltIns: boolean,
  polyfills: PolyfillsOption,
};

// Babel
export type Plugin = [Object, Object];
