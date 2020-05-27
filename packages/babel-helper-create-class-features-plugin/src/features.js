import { hasOwnDecorators } from "./decorators";

export const FEATURES = Object.freeze({
  //classes: 1 << 0,
  fields: 1 << 1,
  privateMethods: 1 << 2,
  decorators: 1 << 3,
  privateIn: 1 << 4,
});

const featuresSameLoose = [
  FEATURES.fields,
  FEATURES.privateMethods,
  FEATURES.privateIn,
];

// We can't use a symbol because this needs to always be the same, even if
// this package isn't deduped by npm. e.g.
//  - node_modules/
//    - @babel/plugin-class-features
//    - @babel/plugin-proposal-decorators
//      - node_modules
//        - @babel-plugin-class-features
const featuresKey = "@babel/plugin-class-features/featuresKey";
const looseKey = "@babel/plugin-class-features/looseKey";
const looseLowPriorityKey =
  "@babel/plugin-class-features/looseLowPriorityKey/#__internal__@babel/preset-env__please-overwrite-loose-instead-of-throwing";

export function enableFeature(file, feature, loose) {
  // We can't blindly enable the feature because, if it was already set,
  // "loose" can't be changed, so that
  //   @babel/plugin-class-properties { loose: true }
  //   @babel/plugin-class-properties { loose: false }
  // is transformed in loose mode.
  // We only enabled the feature if it was previously disabled.
  if (!hasFeature(file, feature) || canIgnoreLoose(file, feature)) {
    file.set(featuresKey, file.get(featuresKey) | feature);
    if (
      loose ===
      "#__internal__@babel/preset-env__prefer-true-but-false-is-ok-if-it-prevents-an-error"
    ) {
      setLoose(file, feature, true);
      file.set(looseLowPriorityKey, file.get(looseLowPriorityKey) | feature);
    } else if (
      loose ===
      "#__internal__@babel/preset-env__prefer-false-but-true-is-ok-if-it-prevents-an-error"
    ) {
      setLoose(file, feature, false);
      file.set(looseLowPriorityKey, file.get(looseLowPriorityKey) | feature);
    } else {
      setLoose(file, feature, loose);
    }
  }

  let resolvedLooseLowPriority: void | true | false;
  let resolvedLoose: void | true | false;

  for (const mask of featuresSameLoose) {
    if (!hasFeature(file, mask)) continue;

    const loose = isLoose(file, mask);
    const lowPriority = canIgnoreLoose(file, mask);

    if (lowPriority) {
      resolvedLooseLowPriority = resolvedLooseLowPriority ?? loose;
    } else if (resolvedLoose === !loose) {
      throw new Error(
        "'loose' mode configuration must be the same for @babel/plugin-proposal-class-properties, " +
          "@babel/plugin-proposal-private-methods and " +
          "@babel/plugin-proposal-private-property-in-object (whe they are enabled).",
      );
    } else {
      resolvedLoose = loose;
    }
  }

  if (resolvedLooseLowPriority !== undefined && resolvedLoose !== undefined) {
    for (const mask of featuresSameLoose) {
      if (hasFeature(file, mask)) setLoose(file, mask, resolvedLoose);
    }
  }
}

function hasFeature(file, feature) {
  return !!(file.get(featuresKey) & feature);
}

export function isLoose(file, feature) {
  return !!(file.get(looseKey) & feature);
}

function setLoose(file, feature, loose) {
  if (loose) file.set(looseKey, file.get(looseKey) | feature);
  else file.set(looseKey, file.get(looseKey) & ~feature);

  file.set(looseLowPriorityKey, file.get(looseLowPriorityKey) & ~feature);
}

function canIgnoreLoose(file, feature) {
  return !!(file.get(looseLowPriorityKey) & feature);
}

export function verifyUsedFeatures(path, file) {
  if (hasOwnDecorators(path.node)) {
    if (!hasFeature(file, FEATURES.decorators)) {
      throw path.buildCodeFrameError(
        "Decorators are not enabled." +
          "\nIf you are using " +
          '["@babel/plugin-proposal-decorators", { "legacy": true }], ' +
          'make sure it comes *before* "@babel/plugin-proposal-class-properties" ' +
          "and enable loose mode, like so:\n" +
          '\t["@babel/plugin-proposal-decorators", { "legacy": true }]\n' +
          '\t["@babel/plugin-proposal-class-properties", { "loose": true }]',
      );
    }

    if (path.isPrivate()) {
      throw path.buildCodeFrameError(
        `Private ${
          path.isClassMethod() ? "methods" : "fields"
        } in decorated classes are not supported yet.`,
      );
    }
  }

  // NOTE: We can't use path.isPrivateMethod() because it isn't supported in <7.2.0
  if (path.isPrivate() && path.isMethod()) {
    if (!hasFeature(file, FEATURES.privateMethods)) {
      throw path.buildCodeFrameError("Class private methods are not enabled.");
    }
  }

  if (
    path.isPrivateName() &&
    path.parentPath.isBinaryExpression({
      operator: "in",
      left: path.node,
    })
  ) {
    if (!hasFeature(file, FEATURES.privateIn)) {
      throw path.buildCodeFrameError(
        "Private property in checks are not enabled.",
      );
    }
  }

  if (path.isProperty()) {
    if (!hasFeature(file, FEATURES.fields)) {
      throw path.buildCodeFrameError("Class fields are not enabled.");
    }
  }
}
