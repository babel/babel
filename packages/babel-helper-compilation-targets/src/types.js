// @flow

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

export type Browsers = string | Array<string>;

export type InputTargets = {
  ...Targets,

  browsers?: Browsers,
  esmodules?: boolean,
};
