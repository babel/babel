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

type unicodeFlag = 1;
type dotAllFlag = 2;
type unicodePropertyEscape = 4;
type namedCaptureGroups = 8;
type featureType =
  | unicodeFlag
  | dotAllFlag
  | unicodePropertyEscape
  | namedCaptureGroups;

export function enableFeature(features: number, feature: featureType): number {
  return features | feature;
}

export function hasFeature(features: number, feature: featureType) {
  return !!(features & feature);
}
