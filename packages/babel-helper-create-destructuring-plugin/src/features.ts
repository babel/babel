import type { File } from "@babel/core";

export const FEATURES = Object.freeze({
  /** ES2015 array and object destructuring patterns (lowered to ES5). */
  destructuring: 1 << 0,
  /** `...rest` properties in object patterns. */
  objectRest: 1 << 1,
  /** `...spread` properties in object literals. */
  objectSpread: 1 << 2,
  /** `#priv: x` properties in object patterns. */
  privateDestructuring: 1 << 3,
});

/**
 * Options resolved by each plugin wrapper. Options that only make sense for a
 * given feature are ignored when that feature is not enabled.
 */
export interface FeatureOptions {
  useBuiltIns?: boolean;
  iterableIsArray?: boolean;
  arrayLikeIsIterable?: boolean;
  objectRestNoSymbols?: boolean;
  pureGetters?: boolean;
  setSpreadProperties?: boolean;
  ignoreFunctionLength?: boolean;
  noNewArrows?: boolean;
}

export type ResolvedOptions = Required<FeatureOptions> & {
  features: number;
};

// We can't use a symbol because this needs to always be the same, even if
// this package isn't deduped by npm.
const featuresKey = "@babel/plugin-destructuring/featuresKey";
const optionsKey = "@babel/plugin-destructuring/optionsKey";
const resolvedKey = "@babel/plugin-destructuring/resolvedKey";

export function enableFeature(
  file: File,
  feature: number,
  options: FeatureOptions,
) {
  file.set(featuresKey, file.get(featuresKey) | feature);
  const allOptions: Map<number, FeatureOptions> =
    file.get(optionsKey) ?? new Map();
  // `feature` may be a combination of several features: store the options
  // for each of them. Keep the first configuration of a given feature, like
  // the class features plugin does with `loose`.
  for (let bit = 1; bit <= feature; bit <<= 1) {
    if (feature & bit && !allOptions.has(bit)) allOptions.set(bit, options);
  }
  file.set(optionsKey, allOptions);
  file.set(resolvedKey, null);
}

const restFirst = [
  FEATURES.objectRest,
  FEATURES.destructuring,
  FEATURES.privateDestructuring,
];
const destructuringFirst = [FEATURES.destructuring, FEATURES.objectRest];
/** The features whose patterns can be moved into the function body. */
const movesParams = [FEATURES.objectRest, FEATURES.privateDestructuring];

/**
 * The features whose plugin options are used for each option, in order. The
 * plugin that "owns" a behavior wins: object rest/spread options come from
 * `transform-object-rest-spread`, array destructuring options from
 * `transform-destructuring`.
 */
const precedence: Record<keyof FeatureOptions, number[]> = {
  useBuiltIns: restFirst,
  iterableIsArray: destructuringFirst,
  arrayLikeIsIterable: destructuringFirst,
  objectRestNoSymbols: restFirst,
  pureGetters: restFirst,
  setSpreadProperties: restFirst,
  ignoreFunctionLength: movesParams,
  noNewArrows: movesParams,
};

/**
 * Merge the options of every enabled plugin into a single configuration
 * used by the shared lowering engine.
 */
export function getResolvedOptions(file: File): ResolvedOptions {
  let resolved: ResolvedOptions | null = file.get(resolvedKey);
  if (resolved) return resolved;

  // Set by `enableFeature`, in the `pre` hook of the plugins
  const features: number = file.get(featuresKey);
  const allOptions: Map<number, FeatureOptions> = file.get(optionsKey);

  resolved = { features } as ResolvedOptions;
  for (const key of Object.keys(precedence) as (keyof FeatureOptions)[]) {
    resolved[key] = false;
    for (const feature of precedence[key]) {
      const value = allOptions.get(feature)?.[key];
      if (value !== undefined) {
        resolved[key] = value;
        break;
      }
    }
  }
  file.set(resolvedKey, resolved);
  return resolved;
}
