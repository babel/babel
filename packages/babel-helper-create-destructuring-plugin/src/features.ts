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
}

export interface ResolvedOptions {
  features: number;
  useBuiltIns: boolean;
  iterableIsArray: boolean;
  arrayLikeIsIterable: boolean;
  objectRestNoSymbols: boolean;
  pureGetters: boolean;
  setSpreadProperties: boolean;
  ignoreFunctionLength: boolean;
  noNewArrows: boolean;
}

// We can't use a symbol because this needs to always be the same, even if
// this package isn't deduped by npm.
const featuresKey = "@babel/plugin-destructuring/featuresKey";
const optionsKey = "@babel/plugin-destructuring/optionsKey";
const resolvedKey = "@babel/plugin-destructuring/resolvedKey";
const noNewArrowsKey = "@babel/plugin-destructuring/noNewArrows";

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

/**
 * Assumptions are shared by all the plugins of a Babel configuration, so
 * unlike plugin options they don't need to be merged.
 */
export function setAssumptions(
  file: File,
  { noNewArrows }: { noNewArrows: boolean | undefined },
) {
  file.set(noNewArrowsKey, noNewArrows ?? true);
}

function pick<K extends keyof FeatureOptions>(
  allOptions: Map<number, FeatureOptions>,
  key: K,
  precedence: number[],
  fallback: NonNullable<FeatureOptions[K]>,
): NonNullable<FeatureOptions[K]> {
  for (const feature of precedence) {
    const value = allOptions.get(feature)?.[key];
    if (value !== undefined) return value;
  }
  return fallback;
}

/**
 * Merge the options of every enabled plugin into a single configuration
 * used by the shared lowering engine. The plugin that "owns" a behavior wins:
 * object rest/spread options come from `transform-object-rest-spread`, array
 * destructuring options from `transform-destructuring`.
 */
export function getResolvedOptions(file: File): ResolvedOptions {
  let resolved: ResolvedOptions | null = file.get(resolvedKey);
  if (resolved) return resolved;

  const features: number = file.get(featuresKey) ?? 0;
  const allOptions: Map<number, FeatureOptions> =
    file.get(optionsKey) ?? new Map();

  const restFirst = [
    FEATURES.objectRest,
    FEATURES.destructuring,
    FEATURES.privateDestructuring,
  ];
  const destructuringFirst = [FEATURES.destructuring, FEATURES.objectRest];

  resolved = {
    features,
    useBuiltIns: pick(allOptions, "useBuiltIns", restFirst, false),
    iterableIsArray: pick(
      allOptions,
      "iterableIsArray",
      destructuringFirst,
      false,
    ),
    arrayLikeIsIterable: pick(
      allOptions,
      "arrayLikeIsIterable",
      destructuringFirst,
      false,
    ),
    objectRestNoSymbols: pick(
      allOptions,
      "objectRestNoSymbols",
      restFirst,
      false,
    ),
    pureGetters: pick(allOptions, "pureGetters", restFirst, false),
    setSpreadProperties: pick(
      allOptions,
      "setSpreadProperties",
      restFirst,
      false,
    ),
    ignoreFunctionLength: pick(
      allOptions,
      "ignoreFunctionLength",
      [FEATURES.objectRest, FEATURES.privateDestructuring],
      false,
    ),
    noNewArrows: file.get(noNewArrowsKey) ?? true,
  };
  file.set(resolvedKey, resolved);
  return resolved;
}
