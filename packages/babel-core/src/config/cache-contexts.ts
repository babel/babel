import type { ConfigContext } from "./config-chain.ts";
import type {
  CallerMetadata,
  TargetsListOrObject,
} from "./validation/options.ts";

export type { ConfigContext as FullConfig };

export type FullPreset = {
  targets: TargetsListOrObject;
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
  targets: TargetsListOrObject;
} & SimpleConfig;
export type SimplePlugin = {
  assumptions: {
    [name: string]: boolean;
  };
} & SimplePreset;
