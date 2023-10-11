export const FEATURES = Object.freeze({
  unicodeFlag: 1 << 0,
  dotAllFlag: 1 << 1,
  unicodePropertyEscape: 1 << 2,
  namedCaptureGroups: 1 << 3,
  // Not used, for backward compatibility with syntax-unicode-sets-regex
  unicodeSetsFlag_syntax: 1 << 4,
  unicodeSetsFlag: 1 << 5,
  duplicateNamedCaptureGroups: 1 << 6,
  modifiers: 1 << 7,
});

// We can't use a symbol because this needs to always be the same, even if
// this package isn't deduped by npm. e.g.
//  - node_modules/
//    - @babel/plugin-regexp-features
//    - @babel/plugin-transform-unicode-property-regex
//      - node_modules
//        - @babel-plugin-regexp-features
export const featuresKey = "@babel/plugin-regexp-features/featuresKey";
export const runtimeKey = "@babel/plugin-regexp-features/runtimeKey";

type FeatureType = (typeof FEATURES)[keyof typeof FEATURES];

export function enableFeature(features: number, feature: FeatureType): number {
  return features | feature;
}

export function hasFeature(features: number, feature: FeatureType) {
  return !!(features & feature);
}
