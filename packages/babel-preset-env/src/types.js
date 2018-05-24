//@flow

// Targets
export type Target =
  | "esmodules"
  | "node"
  | "browsers"
  | "chrome"
  | "opera"
  | "edge"
  | "firefox"
  | "safari"
  | "ie"
  | "ios"
  | "android"
  | "electron";
export type Targets = {
  [target: Target]: string,
};

// Options
// Use explicit modules to prevent typo errors.
export type ModuleOption = false | "amd" | "commonjs" | "systemjs" | "umd";
export type BuiltInsOption = false | "entry" | "usage";

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
  useBuiltIns: BuiltInsOption,
};

// Babel
export type Plugin = [Object, Object];
