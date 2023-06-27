// Targets, engine names defined in compat-tables
export type Target =
  | "node"
  | "deno"
  | "chrome"
  | "opera"
  | "edge"
  | "firefox"
  | "safari"
  | "ie"
  | "ios"
  | "android"
  | "electron"
  | "samsung"
  | "opera_mobile";

export type Targets = {
  [target in Target]?: string;
};

export type TargetsTuple = Omit<Targets, "node"> & {
  node?: string | true;
};

export type Browsers = string | ReadonlyArray<string>;

export type InputTargets = {
  browsers?: Browsers;
  // When `true`, this completely replaces the `browsers` option.
  // When `intersect`, this is intersected with the `browsers`
  // option (giving the higher browsers as the result).
  // TODO(Babel 8): Make `true` behave like `intersect` and
  // remove `intersect`.
  esmodules?: boolean | "intersect";
} & Targets;

export type { BrowserslistBrowserName } from "./targets";
