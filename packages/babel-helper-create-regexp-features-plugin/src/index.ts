import rewritePattern from "regexpu-core";
import { types as t, type PluginObject, type NodePath } from "@babel/core";
import annotateAsPure from "@babel/helper-annotate-as-pure";

import semver from "semver";

import {
  featuresKey,
  FEATURES,
  enableFeature,
  runtimeKey,
  hasFeature,
} from "./features.ts";
import {
  generateRegexpuOptions,
  canSkipRegexpu,
  transformFlags,
} from "./util.ts";

const versionKey = "@babel/plugin-regexp-features/version";

export interface Options {
  name: string;
  feature: keyof typeof FEATURES;
  options?: {
    useUnicodeFlag?: boolean;
    runtime?: boolean;
  };
  manipulateOptions?: PluginObject["manipulateOptions"];
}

export function createRegExpFeaturePlugin({
  name,
  feature,
  options = {},
  manipulateOptions = () => {},
}: Options): PluginObject {
  return {
    name,

    manipulateOptions,

    pre() {
      const { file } = this;
      const features = file.get(featuresKey) ?? 0;
      let newFeatures = enableFeature(features, FEATURES[feature]);

      const { useUnicodeFlag, runtime } = options;
      if (useUnicodeFlag === false) {
        newFeatures = enableFeature(newFeatures, FEATURES.unicodeFlag);
      }
      if (newFeatures !== features) {
        file.set(featuresKey, newFeatures);
      }

      if (runtime !== undefined) {
        if (
          file.has(runtimeKey) &&
          file.get(runtimeKey) !== runtime &&
          (process.env.BABEL_8_BREAKING ||
            // This check. Is necessary because in Babel 7 we allow multiple
            // copies of transform-named-capturing-groups-regex with
            // conflicting 'runtime' options.
            hasFeature(newFeatures, FEATURES.duplicateNamedCaptureGroups))
        ) {
          throw new Error(
            `The 'runtime' option must be the same for ` +
              `'@babel/plugin-transform-named-capturing-groups-regex' and ` +
              `'@babel/plugin-transform-duplicate-named-capturing-groups-regex'.`,
          );
        }

        if (process.env.BABEL_8_BREAKING) {
          file.set(runtimeKey, runtime);
        } else if (
          // This check. Is necessary because in Babel 7 we allow multiple
          // copies of transform-named-capturing-groups-regex with
          // conflicting 'runtime' options.
          feature === "namedCaptureGroups"
        ) {
          if (!runtime || !file.has(runtimeKey)) file.set(runtimeKey, runtime);
        } else {
          file.set(runtimeKey, runtime);
        }
      }

      if (!process.env.BABEL_8_BREAKING) {
        // Until 7.21.4, we used to encode the version as a number.
        // If file.get(versionKey) is a number, it has thus been
        // set by an older version of this plugin.
        if (typeof file.get(versionKey) === "number") {
          file.set(versionKey, PACKAGE_JSON.version);
          return;
        }
      }
      if (
        !file.get(versionKey) ||
        semver.lt(file.get(versionKey), PACKAGE_JSON.version)
      ) {
        file.set(versionKey, PACKAGE_JSON.version);
      }
    },

    visitor: {
      RegExpLiteral(path) {
        const { node } = path;
        const { file } = this;
        const features = file.get(featuresKey);
        const runtime = file.get(runtimeKey) ?? true;

        const regexpuOptions = generateRegexpuOptions(node.pattern, features);
        if (canSkipRegexpu(node, regexpuOptions)) {
          return;
        }

        const namedCaptureGroups: Record<string, number | number[]> = {
          __proto__: null,
        };
        if (regexpuOptions.namedGroups === "transform") {
          regexpuOptions.onNamedGroup = (name, index) => {
            const prev = namedCaptureGroups[name];
            if (typeof prev === "number") {
              namedCaptureGroups[name] = [prev, index];
            } else if (Array.isArray(prev)) {
              prev.push(index);
            } else {
              namedCaptureGroups[name] = index;
            }
          };
        }

        let newFlags;
        if (regexpuOptions.modifiers === "transform") {
          regexpuOptions.onNewFlags = flags => {
            newFlags = flags;
          };
        }

        node.pattern = rewritePattern(node.pattern, node.flags, regexpuOptions);

        if (
          regexpuOptions.namedGroups === "transform" &&
          Object.keys(namedCaptureGroups).length > 0 &&
          runtime &&
          !isRegExpTest(path)
        ) {
          const call = t.callExpression(this.addHelper("wrapRegExp"), [
            node,
            t.valueToNode(namedCaptureGroups),
          ]);
          annotateAsPure(call);

          path.replaceWith(call);
        }

        node.flags = transformFlags(regexpuOptions, newFlags ?? node.flags);
      },
    },
  };
}

function isRegExpTest(path: NodePath<t.RegExpLiteral>) {
  return (
    path.parentPath.isMemberExpression({
      object: path.node,
      computed: false,
    }) && path.parentPath.get("property").isIdentifier({ name: "test" })
  );
}
