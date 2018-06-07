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

export { enableFeature, FEATURES, setLoose };

export default declare((api, options) => {
  api.assertVersion(7);

  const { loose } = options;
  const { instanceFields, staticFields, privateMethods, decorators } = options;

  return {
    manipulateOptions(opts, parserOpts) {
      if (instanceFields) {
        parserOpts.plugins.push("classProperties", "classPrivateProperties");
      }
    },

    pre() {
      setLoose(this.file, loose);

      if (instanceFields) enableFeature(this.file, FEATURES.instanceFields);
      if (staticFields) enableFeature(this.file, FEATURES.staticFields);
      if (privateMethods) enableFeature(this.file, FEATURES.privateMethods);
      if (decorators) enableFeature(this.file, FEATURES.decorators);
    },

    visitor: {
      Class(path, state) {
        verifyUsedFeatures(path, this.file);
        const loose = isLoose(this.file);

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

        transformPrivateNamesUsage(path, privateNamesMap, loose, state);

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
        throw path.buildCodeFrameError(`Unknown PrivateName "${path}"`);
      },
    },
  };
});
