// @flow

import typeof * as browserType from "./resolve-targets-browser";
import typeof * as nodeType from "./resolve-targets";

// Kind of gross, but essentially asserting that the exports of this module are the same as the
// exports of index-browser, since this file may be replaced at bundle time with index-browser.
((({}: any): $Exact<browserType>): $Exact<nodeType>);

import type { ValidatedOptions } from "./validation/options";
import path from "path";
import getTargets, { type Targets } from "@babel/helper-compilation-targets";

export function resolveBrowserslistConfigFile(
  browserslistConfigFile: string,
  configFileDir: string,
): string | void {
  return path.resolve(configFileDir, browserslistConfigFile);
}

export function resolveTargets(
  options: ValidatedOptions,
  root: string,
): Targets {
  let { targets } = options;
  if (typeof targets === "string" || Array.isArray(targets)) {
    targets = { browsers: targets };
  }
  // $FlowIgnore it thinks that targets.esmodules doesn't exist.
  if (targets && targets.esmodules) {
    targets = { ...targets, esmodules: "intersect" };
  }

  const { browserslistConfigFile } = options;
  let configFile;
  let ignoreBrowserslistConfig = false;
  if (typeof browserslistConfigFile === "string") {
    configFile = browserslistConfigFile;
  } else {
    ignoreBrowserslistConfig = browserslistConfigFile === false;
  }

  return getTargets((targets: any), {
    ignoreBrowserslistConfig,
    configFile,
    configPath: root,
    browserslistEnv: options.browserslistEnv,
  });
}
