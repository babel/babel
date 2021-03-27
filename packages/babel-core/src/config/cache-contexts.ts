// @flow

import type { Targets } from "@babel/helper-compilation-targets";

import type { ConfigContext } from "./config-chain";
import type { CallerMetadata } from "./validation/options";

export type { ConfigContext as FullConfig };

export type FullPreset = {
  ...ConfigContext,
  targets: Targets,
};
export type FullPlugin = {
  ...FullPreset,
  assumptions: { [name: string]: boolean },
};

// Context not including filename since it is used in places that cannot
// process 'ignore'/'only' and other filename-based logic.
export type SimpleConfig = {
  envName: string,
  caller: CallerMetadata | void,
};
export type SimplePreset = {
  ...SimpleConfig,
  targets: Targets,
};
export type SimplePlugin = {
  ...SimplePreset,
  assumptions: { [name: string]: boolean },
};
