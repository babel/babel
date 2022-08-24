import rewritePattern from "regexpu-core";
import {
  featuresKey,
  FEATURES,
  enableFeature,
  runtimeKey,
  hasFeature,
} from "./features";
import { generateRegexpuOptions, canSkipRegexpu, transformFlags } from "./util";
import type { NodePath } from "@babel/traverse";

import { types as t } from "@babel/core";
import type { PluginObject } from "@babel/core";
import annotateAsPure from "@babel/helper-annotate-as-pure";

declare const PACKAGE_JSON: { name: string; version: string };

// Note: Versions are represented as an integer. e.g. 7.1.5 is represented
//       as 70000100005. This method is easier than using a semver-parsing
//       package, but it breaks if we release x.y.z where x, y or z are
//       greater than 99_999.
const version = PACKAGE_JSON.version
  .split(".")
  .reduce((v, x) => v * 1e5 + +x, 0);
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
          // TODO(Babel 8): Remove this check. It's necessary because in Babel 7
          // we allow multiple copies of transform-named-capturing-groups-regex
          // with conflicting 'runtime' options.
          hasFeature(newFeatures, FEATURES.duplicateNamedCaptureGroups)
        ) {
          throw new Error(
            `The 'runtime' option must be the same for ` +
              `'@babel/plugin-transform-named-capturing-groups-regex' and ` +
              `'@babel/plugin-proposal-duplicate-named-capturing-groups-regex'.`,
          );
        }
        // TODO(Babel 8): Remove this check and always set it.
        // It's necessary because in Babel 7 we allow multiple copies of
        // transform-named-capturing-groups-regex with conflicting 'runtime' options.
        if (feature === "namedCaptureGroups") {
          if (!runtime || !file.has(runtimeKey)) file.set(runtimeKey, runtime);
        } else {
          file.set(runtimeKey, runtime);
        }
      }

      if (!file.has(versionKey) || file.get(versionKey) < version) {
        file.set(versionKey, version);
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

        node.flags = transformFlags(regexpuOptions, node.flags);
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
