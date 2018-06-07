import { declare } from "@babel/helper-plugin-utils";
import nameFunction from "@babel/helper-function-name";
import { types as t } from "@babel/core";
import {
  buildPrivateNamesNodes,
  buildPrivateNamesMap,
  transformPrivateNamesUsage,
  buildFieldsInitNodes,
} from "./fields";
import { injectInitialization, extractComputedKeys } from "./misc";
import {
  enableFeature,
  verifyUsedFeatures,
  FEATURES,
  setLoose,
  isLoose,
} from "./features";

import pkg from "../package.json";

export { enableFeature, FEATURES, setLoose };

// Note: Versions are represented as an integer. e.g. 7.1.5 is represented
//       as 70000100005. This method is easier than using a semver-parsing
//       package, but it breaks if we relese x.y.z where x, y or z are
//       greater than 99_999.
const version = pkg.version.split(".").reduce((v, x) => v * 1e5 + +x, 0);
const versionKey = "@babel/plugin-class-features/version";

const getFeatureOptions = (options, name) => {
  const value = options[name];

  if (value === undefined || value === false) return { enabled: false };
  if (value === true) return { enabled: true, loose: false };

  if (typeof value === "object") {
    if (
      typeof value.loose !== "undefined" &&
      typeof value.loose !== "boolean"
    ) {
      throw new Error(`.${name}.loose must be a boolean or undefined.`);
    }

    return { enabled: true, loose: !!value.loose };
  }

  throw new Error(
    `.${name} must be a boolean, an object with a 'loose'` +
      ` property or undefined.`,
  );
};

export default declare((api, options) => {
  api.assertVersion(7);

  const fields = getFeatureOptions(options, "fields");
  const privateMethods = getFeatureOptions(options, "privateMethods");
  const decorators = getFeatureOptions(options, "decorators");

  return {
    name: "class-features",

    manipulateOptions(opts, parserOpts) {
      if (fields) {
        parserOpts.plugins.push("classProperties", "classPrivateProperties");
      }
    },

    pre() {
      if (!this.file.get(versionKey) || this.file.get(versionKey) < version) {
        this.file.set(versionKey, version);
      }

      if (fields.enabled) {
        enableFeature(this.file, FEATURES.fields, fields.loose);
      }
      if (privateMethods.enabled) {
        throw new Error("Private methods are not supported yet");
        enableFeature(this.file, FEATURES.privateMethods);
      }
      if (decorators.enabled) {
        throw new Error("Decorators are not supported yet");
        enableFeature(this.file, FEATURES.decorators);
      }
    },

    visitor: {
      Class(path, state) {
        if (this.file.get(versionKey) !== version) return;

        verifyUsedFeatures(path, this.file);

        // Only fields are currently supported, this needs to be moved somewhere
        // else when other features are added.
        const loose = isLoose(this.file, FEATURES.fields);

        let constructor;
        const props = [];
        const computedPaths = [];
        const privateNames = new Set();
        const body = path.get("body");

        for (const path of body.get("body")) {
          verifyUsedFeatures(path, this.file);

          if (path.node.computed) {
            computedPaths.push(path);
          }

          if (path.isClassPrivateProperty()) {
            const { name } = path.node.key.id;

            if (privateNames.has(name)) {
              throw path.buildCodeFrameError("Duplicate private field");
            }
            privateNames.add(name);
          }

          if (path.isProperty()) {
            props.push(path);
          } else if (path.isClassMethod({ kind: "constructor" })) {
            constructor = path;
          }
        }

        if (!props.length) return;

        let ref;

        if (path.isClassExpression() || !path.node.id) {
          nameFunction(path);
          ref = path.scope.generateUidIdentifier("class");
        } else {
          // path.isClassDeclaration() && path.node.id
          ref = path.node.id;
        }

        const keysNodes = extractComputedKeys(
          ref,
          path,
          computedPaths,
          this.file,
        );

        const privateNamesMap = buildPrivateNamesMap(props);
        const privateNamesNodes = buildPrivateNamesNodes(
          privateNamesMap,
          loose,
          state,
        );

        transformPrivateNamesUsage(ref, path, privateNamesMap, loose, state);

        const { staticNodes, instanceNodes } = buildFieldsInitNodes(
          ref,
          props,
          privateNamesMap,
          state,
          loose,
        );
        if (instanceNodes.length > 0) {
          injectInitialization(
            path,
            constructor,
            instanceNodes,
            (referenceVisitor, state) => {
              for (const prop of props) {
                if (prop.node.static) continue;
                prop.traverse(referenceVisitor, state);
              }
            },
          );
        }

        for (const prop of props) {
          prop.remove();
        }

        if (
          keysNodes.length === 0 &&
          staticNodes.length === 0 &&
          privateNamesNodes.length === 0
        ) {
          return;
        }

        if (path.isClassExpression()) {
          path.scope.push({ id: ref });
          path.replaceWith(
            t.assignmentExpression("=", t.cloneNode(ref), path.node),
          );
        } else if (!path.node.id) {
          // Anonymous class declaration
          path.node.id = ref;
        }

        path.insertBefore(keysNodes);
        path.insertAfter([...privateNamesNodes, ...staticNodes]);
      },

      PrivateName(path) {
        if (this.file.get(versionKey) !== version) return;

        throw path.buildCodeFrameError(`Unknown PrivateName "${path}"`);
      },
    },
  };
});
