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

export type TargetsTuple = {|
  [target: Target]: string,
|};

export type Browsers = string | $ReadOnlyArray<string>;

export type InputTargets = {
  ...Targets,

  browsers?: Browsers,

  // When `true`, this completely replaces the `browsers` option.
  // When `intersect`, this is intersected with the `browsers`
  // option (giving the higher browsers as the result).
  // TODO(Babel 8): Make `true` behave like `intersect` and
  // remove `intersect`.
  esmodules?: boolean | "intersect",
};
