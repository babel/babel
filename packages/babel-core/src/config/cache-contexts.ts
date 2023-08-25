import type { Targets } from "@babel/helper-compilation-targets";

import type { ConfigContext } from "./config-chain.ts";
import type { CallerMetadata } from "./validation/options.ts";

export type { ConfigContext as FullConfig };

export type FullPreset = {
  targets: Targets;
} & ConfigContext;
export type FullPlugin = {
  assumptions: { [name: string]: boolean };
} & FullPreset;

// Context not including filename since it is used in places that cannot
// process 'ignore'/'only' and other filename-based logic.
export type SimpleConfig = {
  envName: string;
  caller: CallerMetadata | undefined;
};
export type SimplePreset = {
  targets: Targets;
} & SimpleConfig;
export type SimplePlugin = {
  assumptions: {
    [name: string]: boolean;
  };
} & SimplePreset;
