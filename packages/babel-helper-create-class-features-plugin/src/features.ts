import type { File, types as t } from "@babel/core";
import type { NodePath } from "@babel/traverse";
import { hasOwnDecorators } from "./decorators";

export const FEATURES = Object.freeze(
  process.env.BABEL_8_BREAKING
    ? {
        //classes: 1 << 0,
        fields: 1 << 1,
        privateMethods: 1 << 2,
        privateIn: 1 << 3,
        staticBlocks: 1 << 4,
      }
    : {
        //classes: 1 << 0,
        fields: 1 << 1,
        privateMethods: 1 << 2,
        decorators: 1 << 3,
        privateIn: 1 << 4,
        staticBlocks: 1 << 5,
      },
);

const featuresSameLoose = new Map([
  [FEATURES.fields, "@babel/plugin-transform-class-properties"],
  [FEATURES.privateMethods, "@babel/plugin-transform-private-methods"],
  [FEATURES.privateIn, "@babel/plugin-transform-private-property-in-object"],
]);

// We can't use a symbol because this needs to always be the same, even if
// this package isn't deduped by npm. e.g.
//  - node_modules/
//    - @babel/plugin-class-features
//    - @babel/plugin-proposal-decorators
//      - node_modules
//        - @babel-plugin-class-features
const featuresKey = "@babel/plugin-class-features/featuresKey";
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

export function enableFeature(file: File, feature: number, loose: boolean) {
  // We can't blindly enable the feature because, if it was already set,
  // "loose" can't be changed, so that
  //   @babel/plugin-class-properties { loose: true }
  //   @babel/plugin-class-properties { loose: false }
  // is transformed in loose mode.
  // We only enabled the feature if it was previously disabled.
  if (!hasFeature(file, feature) || canIgnoreLoose(file, feature)) {
    file.set(featuresKey, file.get(featuresKey) | feature);
    if (
      // @ts-expect-error comparing loose with internal private magic string
      loose ===
      "#__internal__@babel/preset-env__prefer-true-but-false-is-ok-if-it-prevents-an-error"
    ) {
      setLoose(file, feature, true);
      file.set(looseLowPriorityKey, file.get(looseLowPriorityKey) | feature);
    } else if (
      // @ts-expect-error comparing loose with internal private magic string
      loose ===
      "#__internal__@babel/preset-env__prefer-false-but-true-is-ok-if-it-prevents-an-error"
    ) {
      setLoose(file, feature, false);
      file.set(looseLowPriorityKey, file.get(looseLowPriorityKey) | feature);
    } else {
      setLoose(file, feature, loose);
    }
  }

  let resolvedLoose: boolean | undefined;
  let higherPriorityPluginName: string | undefined;

  for (const [mask, name] of featuresSameLoose) {
    if (!hasFeature(file, mask)) continue;

    const loose = isLoose(file, mask);

    if (canIgnoreLoose(file, mask)) {
      continue;
    } else if (resolvedLoose === !loose) {
      throw new Error(
        "'loose' mode configuration must be the same for @babel/plugin-transform-class-properties, " +
          "@babel/plugin-transform-private-methods and " +
          "@babel/plugin-transform-private-property-in-object (when they are enabled).",
      );
    } else {
      resolvedLoose = loose;
      higherPriorityPluginName = name;
    }
  }

  if (resolvedLoose !== undefined) {
    for (const [mask, name] of featuresSameLoose) {
      if (hasFeature(file, mask) && isLoose(file, mask) !== resolvedLoose) {
        setLoose(file, mask, resolvedLoose);
        console.warn(
          `Though the "loose" option was set to "${!resolvedLoose}" in your @babel/preset-env ` +
            `config, it will not be used for ${name} since the "loose" mode option was set to ` +
            `"${resolvedLoose}" for ${higherPriorityPluginName}.\nThe "loose" option must be the ` +
            `same for @babel/plugin-transform-class-properties, @babel/plugin-transform-private-methods ` +
            `and @babel/plugin-transform-private-property-in-object (when they are enabled): you can ` +
            `silence this warning by explicitly adding\n` +
            `\t["${name}", { "loose": ${resolvedLoose} }]\n` +
            `to the "plugins" section of your Babel config.`,
        );
      }
    }
  }
}

function hasFeature(file: File, feature: number) {
  return !!(file.get(featuresKey) & feature);
}

export function isLoose(file: File, feature: number) {
  return !!(file.get(looseKey) & feature);
}

function setLoose(file: File, feature: number, loose: boolean) {
  if (loose) file.set(looseKey, file.get(looseKey) | feature);
  else file.set(looseKey, file.get(looseKey) & ~feature);

  file.set(looseLowPriorityKey, file.get(looseLowPriorityKey) & ~feature);
}

function canIgnoreLoose(file: File, feature: number) {
  return !!(file.get(looseLowPriorityKey) & feature);
}

export function shouldTransform(path: NodePath<t.Class>, file: File): boolean {
  let decoratorPath: NodePath<t.Decorator> | null = null;
  let publicFieldPath: NodePath<t.ClassProperty> | null = null;
  let privateFieldPath: NodePath<t.ClassPrivateProperty> | null = null;
  let privateMethodPath: NodePath<t.ClassPrivateMethod> | null = null;
  let staticBlockPath: NodePath<t.StaticBlock> | null = null;

  if (hasOwnDecorators(path.node)) {
    decoratorPath = path.get("decorators.0");
  }
  for (const el of path.get("body.body")) {
    if (!decoratorPath && hasOwnDecorators(el.node)) {
      decoratorPath = el.get("decorators.0");
    }
    if (!publicFieldPath && el.isClassProperty()) {
      publicFieldPath = el;
    }
    if (!privateFieldPath && el.isClassPrivateProperty()) {
      privateFieldPath = el;
    }
    // NOTE: path.isClassPrivateMethod() it isn't supported in <7.2.0
    if (!privateMethodPath && el.isClassPrivateMethod?.()) {
      privateMethodPath = el;
    }
    if (!staticBlockPath && el.isStaticBlock?.()) {
      staticBlockPath = el;
    }
  }

  if (decoratorPath && privateFieldPath) {
    throw privateFieldPath.buildCodeFrameError(
      "Private fields in decorated classes are not supported yet.",
    );
  }
  if (decoratorPath && privateMethodPath) {
    throw privateMethodPath.buildCodeFrameError(
      "Private methods in decorated classes are not supported yet.",
    );
  }

  if (decoratorPath && !hasFeature(file, FEATURES.decorators)) {
    throw path.buildCodeFrameError(
      "Decorators are not enabled." +
        "\nIf you are using " +
        '["@babel/plugin-proposal-decorators", { "version": "legacy" }], ' +
        'make sure it comes *before* "@babel/plugin-transform-class-properties" ' +
        "and enable loose mode, like so:\n" +
        '\t["@babel/plugin-proposal-decorators", { "version": "legacy" }]\n' +
        '\t["@babel/plugin-transform-class-properties", { "loose": true }]',
    );
  }

  if (privateMethodPath && !hasFeature(file, FEATURES.privateMethods)) {
    throw privateMethodPath.buildCodeFrameError(
      "Class private methods are not enabled. " +
        "Please add `@babel/plugin-transform-private-methods` to your configuration.",
    );
  }

  if (
    (publicFieldPath || privateFieldPath) &&
    !hasFeature(file, FEATURES.fields) &&
    // We want to allow enabling the private-methods plugin even without enabling
    // the class-properties plugin. Class fields will still be compiled in classes
    // that contain private methods.
    // This is already allowed with the other various class features plugins, but
    // it's because they can fallback to a transform separated from this helper.
    !hasFeature(file, FEATURES.privateMethods)
  ) {
    throw path.buildCodeFrameError(
      "Class fields are not enabled. " +
        "Please add `@babel/plugin-transform-class-properties` to your configuration.",
    );
  }

  if (staticBlockPath && !hasFeature(file, FEATURES.staticBlocks)) {
    throw path.buildCodeFrameError(
      "Static class blocks are not enabled. " +
        "Please add `@babel/plugin-transform-class-static-block` to your configuration.",
    );
  }

  if (decoratorPath || privateMethodPath || staticBlockPath) {
    // If one of those feature is used we know that its transform is
    // enabled, otherwise the previous checks throw.
    return true;
  }
  if (
    (publicFieldPath || privateFieldPath) &&
    hasFeature(file, FEATURES.fields)
  ) {
    return true;
  }

  return false;
}
