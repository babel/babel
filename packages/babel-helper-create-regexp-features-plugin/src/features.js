// @flow
export const FEATURES = Object.freeze({
  unicodeFlag: 1 << 0,
  dotAllFlag: 1 << 1,
  unicodePropertyEscape: 1 << 2,
  namedCaptureGroups: 1 << 3,
});

// We can't use a symbol because this needs to always be the same, even if
// this package isn't deduped by npm. e.g.
//  - node_modules/
//    - @babel/plugin-regexp-features
//    - @babel/plugin-proposal-unicode-property-regex
//      - node_modules
//        - @babel-plugin-regexp-features
export const featuresKey = "@babel/plugin-regexp-features/featuresKey";
export const runtimeKey = "@babel/plugin-regexp-features/runtimeKey";

export function enableFeature(features, feature): number {
  return features | feature;
}

export function hasFeature(features, feature) {
  return !!(features & feature);
}
