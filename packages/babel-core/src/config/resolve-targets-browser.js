// @flow

import type { ValidatedOptions } from "./validation/options";
import getTargets, { type Targets } from "@babel/helper-compilation-targets";

export function resolveBrowserslistConfigFile(
  // eslint-disable-next-line no-unused-vars
  browserslistConfigFile: string,
  // eslint-disable-next-line no-unused-vars
  configFilePath: string,
): string | void {
  return undefined;
}

export function resolveTargets(
  options: ValidatedOptions,
  // eslint-disable-next-line no-unused-vars
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

  return getTargets((targets: any), {
    ignoreBrowserslistConfig: true,
    browserslistEnv: options.browserslistEnv,
  });
}
