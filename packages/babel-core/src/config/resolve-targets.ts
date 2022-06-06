type browserType = typeof import("./resolve-targets-browser");
type nodeType = typeof import("./resolve-targets");

// Kind of gross, but essentially asserting that the exports of this module are the same as the
// exports of index-browser, since this file may be replaced at bundle time with index-browser.
({} as any as browserType as nodeType);

import type { ValidatedOptions } from "./validation/options";
import path from "path";
import getTargets, {
  type InputTargets,
} from "@babel/helper-compilation-targets";

import type { Targets } from "@babel/helper-compilation-targets";

export function resolveBrowserslistConfigFile(
  browserslistConfigFile: string,
  configFileDir: string,
): string | undefined {
  return path.resolve(configFileDir, browserslistConfigFile);
}

export function resolveTargets(
  options: ValidatedOptions,
  root: string,
): Targets {
  const optTargets = options.targets;
  let targets: InputTargets;

  if (typeof optTargets === "string" || Array.isArray(optTargets)) {
    targets = { browsers: optTargets };
  }
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

  return getTargets(targets, {
    ignoreBrowserslistConfig,
    configFile,
    configPath: root,
    browserslistEnv: options.browserslistEnv,
  });
}
