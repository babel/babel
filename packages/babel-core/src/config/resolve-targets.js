// @flow

import typeof * as browserType from "./resolve-targets-browser";
import typeof * as nodeType from "./resolve-targets";

// Kind of gross, but essentially asserting that the exports of this module are the same as the
// exports of index-browser, since this file may be replaced at bundle time with index-browser.
((({}: any): $Exact<browserType>): $Exact<nodeType>);

import type { ValidatedOptions } from "./validation/options";
import path from "path";
import getTargets, { type Targets } from "@babel/helper-compilation-targets";

export function resolveTargets(
  options: ValidatedOptions,
  root: string,
  filename: string | void,
): Targets {
  let { targets } = options;
  if (typeof targets === "string" || Array.isArray(targets)) {
    targets = { browsers: targets };
  }
  // $FlowIgnore it thinks that targets.esmodules doesn't exist.
  if (targets && targets.esmodules) {
    targets = { ...targets, esmodules: "intersect" };
  }

  let configFile;
  if (typeof options.browserslistConfigFile === "string") {
    configFile = path.resolve(root, options.browserslistConfigFile);
  }

  return getTargets((targets: any), {
    ignoreBrowserslistConfig: options.browserslistConfigFile === false,
    configFile,
    configPath: filename ?? root,
    browserslistEnv: options.browserslistEnv,
  });
}
