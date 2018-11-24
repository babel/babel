import { hasDecorators } from "./decorators";

export const FEATURES = Object.freeze({
  //classes: 1 << 0,
  fields: 1 << 1,
  privateMethods: 1 << 2,
  decorators: 1 << 3,
});

// We can't use a symbol because this needs to always be the same, even if
// this package isn't deduped by npm. e.g.
//  - node_modules/
//    - @babel/plugin-class-features
//    - @babel/plugin-proposal-decorators
//      - node_modules
//        - @babel-plugin-class-features
const featuresKey = "@babel/plugin-class-features/featuresKey";
const looseKey = "@babel/plugin-class-features/looseKey";

export function enableFeature(file, feature, loose) {
  // We can't blindly enable the feature because, if it was already set,
  // "loose" can't be changed, so that
  //   @babel/plugin-class-properties { loose: true }
  //   @babel/plugin-class-properties { loose: false }
  // is transformed in loose mode.
  // We only enabled the feature if it was previously disabled.
  if (!hasFeature(file, feature)) {
    file.set(featuresKey, file.get(featuresKey) | feature);
    if (loose) file.set(looseKey, file.get(looseKey) | feature);
  }
}

function hasFeature(file, feature) {
  return !!(file.get(featuresKey) & feature);
}

export function isLoose(file, feature) {
  return !!(file.get(looseKey) & feature);
}

export function verifyUsedFeatures(path, file) {
  if (hasFeature(file, FEATURES.decorators)) {
    throw new Error(
      "@babel/plugin-class-features doesn't support decorators yet.",
    );
  }

  if (path.isClassPrivateMethod()) {
    if (!hasFeature(file, FEATURES.privateMethods)) {
      throw path.buildCodeFrameError("Class private methods are not enabled.");
    }

    if (path.node.static) {
      throw new Error(
        "@babel/plugin-class-features doesn't support class static private methods yet.",
      );
    }

    if (path.node.kind !== "method") {
      throw new Error(
        "@babel/plugin-class-features doesn't support class private accessors yet.",
      );
    }
  }

  if (hasDecorators(path) && !hasFeature(file, FEATURES.decorators)) {
    throw path.buildCodeFrameError("Decorators are not enabled.");
  }

  if (path.isProperty()) {
    if (!hasFeature(file, FEATURES.fields)) {
      throw path.buildCodeFrameError("Class fields are not enabled.");
    }
  }
}
