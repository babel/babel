import nameFunction from "@babel/helper-function-name";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import {
  buildPrivateNamesNodes,
  buildPrivateNamesMap,
  transformPrivateNamesUsage,
  buildFieldsInitNodes,
} from "./fields";
import {
  hasOwnDecorators,
  buildDecoratedClass,
  hasDecorators,
} from "./decorators";
import { injectInitialization, extractComputedKeys } from "./misc";
import {
  enableFeature,
  verifyUsedFeatures,
  FEATURES,
  isLoose,
} from "./features";

import pkg from "../package.json";

export { FEATURES };

// Note: Versions are represented as an integer. e.g. 7.1.5 is represented
//       as 70000100005. This method is easier than using a semver-parsing
//       package, but it breaks if we relese x.y.z where x, y or z are
//       greater than 99_999.
const version = pkg.version.split(".").reduce((v, x) => v * 1e5 + +x, 0);
const versionKey = "@babel/plugin-class-features/version";

export function createClassFeaturePlugin({
  name,
  feature,
  loose,
  manipulateOptions,
}) {
  return {
    name,
    manipulateOptions,

    pre() {
      enableFeature(this.file, feature, loose);

      if (!this.file.get(versionKey) || this.file.get(versionKey) < version) {
        this.file.set(versionKey, version);
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
        let isDecorated = hasOwnDecorators(path.node);
        const props = [];
        const elements = [];
        const computedPaths = [];
        const privateNames = new Set();
        const body = path.get("body");

        for (const path of body.get("body")) {
          verifyUsedFeatures(path, this.file);

          if (path.node.computed) {
            computedPaths.push(path);
          }

          if (path.isPrivate()) {
            const { name } = path.node.key.id;

            if (privateNames.has(name)) {
              throw path.buildCodeFrameError("Duplicate private field");
            }
            privateNames.add(name);
          }

          if (path.isClassMethod({ kind: "constructor" })) {
            constructor = path;
          } else {
            elements.push(path);
            if (path.isProperty() || path.isPrivate()) {
              props.push(path);
            }
          }

          if (!isDecorated) isDecorated = hasOwnDecorators(path.node);
        }

        if (!props.length && !isDecorated) return;

        if (loose && isDecorated && privateNames.size) {
          throw path.buildCodeFrameError(
            "Decorators and private elements together are " +
              "not supported yet in loose mode.",
          );
        }

        let ref;

        if (path.isClassExpression() || !path.node.id) {
          nameFunction(path);
          ref = path.scope.generateUidIdentifier("class");
        } else {
          ref = path.node.id;
        }

        const privateNamesMap = buildPrivateNamesMap(props);
        const privateNamesNodes = buildPrivateNamesNodes(
          privateNamesMap,
          loose,
          isDecorated,
          state,
        );

        transformPrivateNamesUsage(
          ref,
          path,
          privateNamesMap,
          loose,
          isDecorated,
          state,
        );

        let keysNodes, staticNodes, instanceNodes, wrapClass;

        if (isDecorated) {
          staticNodes = keysNodes = [];
          ({ instanceNodes, wrapClass } = buildDecoratedClass(
            ref,
            path,
            elements,
            privateNamesMap,
            this.file,
          ));
        } else {
          keysNodes = extractComputedKeys(ref, path, computedPaths, this.file);
          ({ staticNodes, instanceNodes, wrapClass } = buildFieldsInitNodes(
            ref,
            props,
            privateNamesMap,
            state,
            loose,
          ));
        }

        if (instanceNodes.length > 0) {
          injectInitialization(
            path,
            constructor,
            instanceNodes,
            (referenceVisitor, state) => {
              if (isDecorated) return;
              for (const prop of props) {
                if (prop.node.static) continue;
                prop.traverse(referenceVisitor, state);
              }
            },
          );
        }

        path = wrapClass(path);
        path.insertBefore(keysNodes);
        path.insertAfter([...privateNamesNodes, ...staticNodes]);
      },

      PrivateName(path) {
        if (this.file.get(versionKey) !== version) return;

        throw path.buildCodeFrameError(`Unknown PrivateName "${path}"`);
      },

      ExportDefaultDeclaration(path) {
        if (this.file.get(versionKey) !== version) return;

        const decl = path.get("declaration");

        if (decl.isClassDeclaration() && hasDecorators(decl.node)) {
          if (decl.node.id) {
            // export default class Foo {}
            //   -->
            // class Foo {} export { Foo as default }
            splitExportDeclaration(path);
          } else {
            // Annyms class declarations can be
            // transformed as if they were expressions
            decl.node.type = "ClassExpression";
          }
        }
      },
    },
  };
}
