import { hasDecorators } from "./decorators";

export const FEATURES = Object.freeze({
  instanceFields: 1 << 0,
  staticFields: 1 << 1,
  privateMethods: 1 << 2,
  decorators: 1 << 3,
});

// We can't use a symbol because this needs to always be the same, even if
// this package isn't deduped by npm. e.g.
//  - node_modules/
//    - @babel/plugin-proposal-enhanced-classes
//    - @babel/plugin-proposal-decorators
//      - node_modules
//        - @babel-plugin-proposal-enhanced-classes
const featuresKey = "@babel/plugin-proposal-enhanced-classes/featuresKey";
const looseKey = "@babel/plugin-proposal-enhanced-classes/looseKey";

export function enableFeature(file, feature) {
  file.set(featuresKey, file.get(featuresKey) | feature);
}

function hasFeature(file, feature) {
  return file.get(featuresKey) & feature;
}

export function verifyUsedFeatures(path, file) {
  if (hasFeature(file, FEATURES.decorators)) {
    throw new Error(
      "@babel/plugin-proposal-enhanced-classes" +
        " doesn't suport decorators yet.",
    );
  }
  if (hasFeature(file, FEATURES.privateMethods)) {
    throw new Error(
      "@babel/plugin-proposal-enhanced-classes" +
        " doesn't suport private methods yet.",
    );
  }

  if (hasDecorators(path) && !hasFeature(file, FEATURES.decorators)) {
    throw path.buildCodeFrameError("Decorators are not enabled.");
  }

  if (path.isProperty()) {
    if (path.node.static) {
      if (!hasFeature(file, FEATURES.staticFields)) {
        throw path.buildCodeFrameError("Static fields are not enabled.");
      }
      if (path.isPrivate()) {
        throw path.buildCodeFrameError(
          "Static class fields are not spec'ed yet.",
        );
      }
    } else {
      if (!hasFeature(file, FEATURES.instanceFields)) {
        throw path.buildCodeFrameError("Instance fields are not enabled.");
      }
    }
  }
}

// Set "loose". The original value isn't overwritten, so
//   @babel/plugin-class-properties { loose: true }
//   @babel/plugin-class-properties { loose: false }
// is transformed in loose mode.
export function setLoose(file, loose) {
  const oldLoose = file.get(looseKey);
  if (oldLoose === undefined) file.set(looseKey, loose);
}

export function isLoose(file) {
  return !!file.get(looseKey);
}
