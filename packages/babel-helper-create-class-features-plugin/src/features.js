import { hasOwnDecorators } from "./decorators";

export const FEATURES = Object.freeze({
  //classes: 1 << 0,
  fields: 1 << 1,
  privateMethods: 1 << 2,
  decorators: 1 << 3,
  privateIn: 1 << 4,
});

const featuresSameLoose = new Map([
  [FEATURES.fields, "@babel/plugin-proposal-class-properties"],
  [FEATURES.privateMethods, "@babel/plugin-proposal-private-methods"],
  [
    FEATURES.privateIn,
    "@babel/plugin-proposal-private-private-property-in-object",
  ],
]);

// We can't use a symbol because this needs to always be the same, even if
// this package isn't deduped by npm. e.g.
//  - node_modules/
//    - @babel/plugin-class-features
//    - @babel/plugin-proposal-decorators
//      - node_modules
//        - @babel-plugin-class-features
const featuresKey = "@babel/plugin-class-features/featuresKey";
const featuresIfFieldsKey = "@babel/plugin-class-features/featuresIfFieldsKey";
const looseKey = "@babel/plugin-class-features/looseKey";

// See https://github.com/babel/babel/issues/11622.
// Since preset-env sets loose for the fields and private methods plugins, it can
// cause conflicts with the loose mode set by an explicit plugin in the config.
// To solve this problem, we ignore preset-env's loose mode if another plugin
// explicitly sets it
// The code to handle this logic doesn't check that "low priority loose" is always
// the same. However, it is only set by the preset and not directly by users:
// unless someone _wants_ to break it, it shouldn't be a problem.
const looseLowPriorityKey =
  "@babel/plugin-class-features/looseLowPriorityKey/#__internal__@babel/preset-env__please-overwrite-loose-instead-of-throwing";

function enableFeatureOn(key, file, feature, loose) {
  // We can't blindly enable the feature because, if it was already set,
  // "loose" can't be changed, so that
  //   @babel/plugin-class-properties { loose: true }
  //   @babel/plugin-class-properties { loose: false }
  // is transformed in loose mode.
  // We only enabled the feature if it was previously disabled.
  if (!mightHaveFeature(file, feature) || canIgnoreLoose(file, feature)) {
    file.set(key, file.get(key) | feature);
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

  let resolvedLoose: void | true | false;
  let higherPriorityPluginName: void | string;

  for (const [mask, name] of featuresSameLoose) {
    if (!mightHaveFeature(file, mask)) continue;

    const loose = isLoose(file, mask);

    if (canIgnoreLoose(file, mask)) {
      continue;
    } else if (resolvedLoose === !loose) {
      throw new Error(
        "'loose' mode configuration must be the same for @babel/plugin-proposal-class-properties, " +
          "@babel/plugin-proposal-private-methods and " +
          "@babel/plugin-proposal-private-property-in-object (when they are enabled).",
      );
    } else {
      resolvedLoose = loose;
      higherPriorityPluginName = name;
    }
  }

  if (resolvedLoose !== undefined) {
    for (const [mask, name] of featuresSameLoose) {
      if (
        mightHaveFeature(file, mask) &&
        isLoose(file, mask) !== resolvedLoose
      ) {
        setLoose(file, mask, resolvedLoose);
        console.warn(
          `Though the "loose" option was set to "${!resolvedLoose}" in your @babel/preset-env ` +
            `config, it will not be used for ${name} since the "loose" mode option was set to ` +
            `"${resolvedLoose}" for ${higherPriorityPluginName}.\nThe "loose" option must be the ` +
            `same for @babel/plugin-proposal-class-properties, @babel/plugin-proposal-private-methods ` +
            `and @babel/plugin-proposal-private-property-in-object (when they are enabled): you can ` +
            `silence this warning by explicitly adding\n` +
            `\t["${name}", { "loose": ${resolvedLoose} }]\n` +
            `to the "plugins" section of your Babel config.`,
        );
      }
    }
  }
}

export function enableFeature(file, feature, loose) {
  enableFeatureOn(featuresKey, file, feature, loose);
}

export function enableFeatureIfCompilingFields(file, feature, loose) {
  enableFeatureOn(featuresIfFieldsKey, file, feature, loose);
}

function hasFeature(file, feature) {
  return !!(file.get(featuresKey) & feature);
}

function hasFeatureIfCompilingFields(file, feature) {
  return !!(file.get(featuresIfFieldsKey) & feature);
}

function mightHaveFeature(file, feature) {
  return (
    hasFeature(file, feature) || hasFeatureIfCompilingFields(file, feature)
  );
}

function shouldCompile(file, feature) {
  return (
    hasFeature(file, feature) ||
    (hasFeature(file, FEATURES.fields) &&
      hasFeatureIfCompilingFields(file, feature))
  );
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
  const used = {
    fields: null,
    privateElements: null,
    privateMethods: null,
    decorators: null,
    privateIn: null,
    staticBlock: null,
  };

  if (hasOwnDecorators(path.node)) {
    used.decorators = path.get("decorators.0");
  }

  for (const elem of path.get("body.body")) {
    if (hasOwnDecorators(elem.node)) {
      used.decorators = used.decorators ?? elem.get("decorators.0");
    }

    if (elem.isPrivate()) {
      if (elem.isMethod()) {
        used.privateMethods = used.privateMethods ?? elem;
      } else {
        elem.assertProperty();
        used.privateFields = used.privateFields ?? elem;
      }
    }

    if (elem.isProperty()) {
      used.fields = used.fields ?? elem;
    }

    if (elem.isStaticBlock?.()) {
      throw elem.buildCodeFrameError(
        `Incorrect plugin order, \`@babel/plugin-proposal-class-static-block\` should be placed before class features plugins
{
  "plugins": [
    "@babel/plugin-proposal-class-static-block",
    "@babel/plugin-proposal-private-property-in-object",
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-class-properties",
  ]
}`,
      );
    }
  }

  if (used.privateElements) {
    path.traverse({
      BinaryExpression(path) {
        if (path.node.operator === "in" && path.get("left").isPrivateName()) {
          used.privateIn = path;
          path.stop();
        }
      },
    });
  }

  if (
    used.fields &&
    used.privateMethods &&
    hasFeature(file, FEATURES.fields) &&
    !shouldCompile(file, FEATURES.privateMethods)
  ) {
    throw used.privateMethods.buildCodeFrameError(
      "Class private methods are not enabled." +
        "\nYou can enable @babel/plugin-proposal-private-methods to compile them.",
    );
  }

  if (
    used.fields &&
    used.privateMethods &&
    !shouldCompile(file, FEATURES.fields) &&
    hasFeature(file, FEATURES.privateMethods)
  ) {
    throw used.fields.buildCodeFrameError(
      "Class fields are not enabled." +
        "\nYou can enable @babel/plugin-proposal-private-properties to compile them.",
    );
  }

  if (used.decorators && !shouldCompile(file, FEATURES.decorators)) {
    throw used.decorators.buildCodeFrameError(
      "Decorators are not enabled." +
        "\nIf you are using " +
        '["@babel/plugin-proposal-decorators", { "legacy": true }], ' +
        'make sure it comes *before* "@babel/plugin-proposal-class-properties" ' +
        "and enable loose mode, like so:\n" +
        '\t["@babel/plugin-proposal-decorators", { "legacy": true }]\n' +
        '\t["@babel/plugin-proposal-class-properties", { "loose": true }]',
    );
  }

  if (
    used.decorators &&
    used.privateElements &&
    hasFeature(file, FEATURES.decorators)
  ) {
    throw used.privateElements.buildCodeFrameError(
      `Private ${
        used.privateElements.isClassMethod() ? "methods" : "fields"
      } in decorated classes are not supported yet.`,
    );
  }

  if (
    used.privateIn &&
    hasFeature(file, FEATURES.privateIn) &&
    !shouldCompile(file, FEATURES.fields)
  ) {
    throw used.privateIn.buildCodeFrameError(
      "It's not possible to compile '#private in obj' checks without compiling" +
        " class fields.",
    );
  }

  if (
    used.privateIn &&
    hasFeature(file, FEATURES.privateIn) &&
    !shouldCompile(file, FEATURES.fields)
  ) {
    throw used.privateIn.buildCodeFrameError(
      "It's not possible to compile '#private in obj' checks without compiling" +
        " class fields.",
    );
  }

  if (
    used.privateIn &&
    !shouldCompile(file, FEATURES.privateIn) &&
    hasFeature(file, FEATURES.fields)
  ) {
    throw used.privateIn.buildCodeFrameError(
      "Private property in checks are not enabled.",
    );
  }

  return Object.keys(FEATURES).some(
    feat => used[feat] && shouldCompile(file, FEATURES[feat]),
  );
}
