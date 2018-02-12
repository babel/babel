//@flow

// Targets
export type Target = string;
export type Targets = {
  [target: string]: Target,
};
// Options
// Use explicit modules to prevent typo errors.
export type KnownModuleFormat = "amd" | "commonjs" | "systemjs" | "umd";
export type TransformModulesPlugin = [KnownModuleFormat, ?Object];
export type ModulesOption = false | KnownModuleFormat | TransformModulesPlugin;
export type BuiltInsOption = false | "entry" | "usage";

export type Options = {
  configPath: string,
  debug: boolean,
  exclude: Array<string>,
  forceAllTransforms: boolean,
  ignoreBrowserslistConfig: boolean,
  include: Array<string>,
  loose: boolean,
  modules: ModulesOption,
  shippedProposals: boolean,
  spec: boolean,
  targets: Targets,
  useBuiltIns: BuiltInsOption,
};

// Babel
export type Plugin = [Object, Object];
