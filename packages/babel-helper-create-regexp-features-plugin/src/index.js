import rewritePattern from "regexpu-core";
import {
  featuresKey,
  FEATURES,
  enableFeature,
  runtimeKey,
  hasFeature,
} from "./features";
import { generateRegexpuOptions } from "./util";

import pkg from "../package.json";
import { types as t } from "@babel/core";
import { pullFlag } from "@babel/helper-regex";

// Note: Versions are represented as an integer. e.g. 7.1.5 is represented
//       as 70000100005. This method is easier than using a semver-parsing
//       package, but it breaks if we release x.y.z where x, y or z are
//       greater than 99_999.
const version = pkg.version.split(".").reduce((v, x) => v * 1e5 + +x, 0);
const versionKey = "@babel/plugin-regexp-features/version";

export function createRegExpFeaturePlugin({ name, feature, options = {} }) {
  return {
    name,
    pre() {
      const { file } = this;
      const features = file.get(featuresKey) ?? 0;
      let newFeatures = enableFeature(features, FEATURES[feature]);

      const { useUnicodeFlag, runtime = true } = options;
      if (useUnicodeFlag === false) {
        newFeatures = enableFeature(newFeatures, FEATURES.unicodeFlag);
      }
      if (newFeatures !== features) {
        file.set(featuresKey, newFeatures);
      }

      if (!runtime) {
        file.set(runtimeKey, false);
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
        const regexpuOptions = generateRegexpuOptions(node, features);
        if (regexpuOptions === null) {
          return;
        }
        const namedCaptureGroups = {};
        if (regexpuOptions.namedGroup) {
          regexpuOptions.onNamedGroup = (name, index) => {
            namedCaptureGroups[name] = index;
          };
        }
        node.pattern = rewritePattern(node.pattern, node.flags, regexpuOptions);

        if (
          regexpuOptions.namedGroup &&
          Object.keys(namedCaptureGroups).length > 0 &&
          runtime &&
          !isRegExpTest(path)
        ) {
          path.replaceWith(
            t.callExpression(this.addHelper("wrapRegExp"), [
              node,
              t.valueToNode(namedCaptureGroups),
            ]),
          );
        }
        if (hasFeature(features, FEATURES.unicodeFlag)) {
          pullFlag(node, "u");
        }
        if (hasFeature(features, FEATURES.dotAllFlag)) {
          pullFlag(node, "s");
        }
      },
    },
  };
}

function isRegExpTest(path) {
  return (
    path.parentPath.isMemberExpression({
      object: path.node,
      computed: false,
    }) && path.parentPath.get("property").isIdentifier({ name: "test" })
  );
}
