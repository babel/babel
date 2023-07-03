/// <reference path="../../../lib/semver.d.ts" />

import { types as t } from "@babel/core";
import type { PluginAPI, PluginObject } from "@babel/core";
import type { NodePath } from "@babel/traverse";
import nameFunction from "@babel/helper-function-name";
import splitExportDeclaration from "@babel/helper-split-export-declaration";

// TODO(Babel 8): Use "semver" directly
import semver from "@nicolo-ribaudo/semver-v6";

import {
  buildPrivateNamesNodes,
  buildPrivateNamesMap,
  transformPrivateNamesUsage,
  buildFieldsInitNodes,
  buildCheckInRHS,
} from "./fields";
import type { PropPath } from "./fields";
import { buildDecoratedClass, hasDecorators } from "./decorators";
import { injectInitialization, extractComputedKeys } from "./misc";
import { enableFeature, FEATURES, isLoose, shouldTransform } from "./features";
import { assertFieldTransformed } from "./typescript";

export { FEATURES, enableFeature, injectInitialization, buildCheckInRHS };

const versionKey = "@babel/plugin-class-features/version";

interface Options {
  name: string;
  feature: number;
  loose?: boolean;
  inherits?: PluginObject["inherits"];
  manipulateOptions?: PluginObject["manipulateOptions"];
  api?: PluginAPI;
}

export function createClassFeaturePlugin({
  name,
  feature,
  loose,
  manipulateOptions,
  api,
  inherits,
}: Options): PluginObject {
  if (!process.env.BABEL_8_BREAKING) {
    api ??= { assumption: () => void 0 as any } as any;
  }
  const setPublicClassFields = api.assumption("setPublicClassFields");
  const privateFieldsAsSymbols = api.assumption("privateFieldsAsSymbols");
  const privateFieldsAsProperties = api.assumption("privateFieldsAsProperties");
  const constantSuper = api.assumption("constantSuper");
  const noDocumentAll = api.assumption("noDocumentAll");

  if (privateFieldsAsProperties && privateFieldsAsSymbols) {
    throw new Error(
      `Cannot enable both the "privateFieldsAsProperties" and ` +
        `"privateFieldsAsSymbols" assumptions as the same time.`,
    );
  }
  const privateFieldsAsSymbolsOrProperties =
    privateFieldsAsProperties || privateFieldsAsSymbols;

  if (loose === true) {
    type AssumptionName = Parameters<PluginAPI["assumption"]>[0];
    const explicit: `"${AssumptionName}"`[] = [];

    if (setPublicClassFields !== undefined) {
      explicit.push(`"setPublicClassFields"`);
    }
    if (privateFieldsAsProperties !== undefined) {
      explicit.push(`"privateFieldsAsProperties"`);
    }
    if (privateFieldsAsSymbols !== undefined) {
      explicit.push(`"privateFieldsAsSymbols"`);
    }
    if (explicit.length !== 0) {
      console.warn(
        `[${name}]: You are using the "loose: true" option and you are` +
          ` explicitly setting a value for the ${explicit.join(" and ")}` +
          ` assumption${explicit.length > 1 ? "s" : ""}. The "loose" option` +
          ` can cause incompatibilities with the other class features` +
          ` plugins, so it's recommended that you replace it with the` +
          ` following top-level option:\n` +
          `\t"assumptions": {\n` +
          `\t\t"setPublicClassFields": true,\n` +
          `\t\t"privateFieldsAsSymbols": true\n` +
          `\t}`,
      );
    }
  }

  return {
    name,
    manipulateOptions,
    inherits,

    pre(file) {
      enableFeature(file, feature, loose);

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
      Class(path, { file }) {
        if (file.get(versionKey) !== PACKAGE_JSON.version) return;

        if (!shouldTransform(path, file)) return;

        if (path.isClassDeclaration()) assertFieldTransformed(path);

        const loose = isLoose(file, feature);

        let constructor: NodePath<t.ClassMethod>;
        const isDecorated = hasDecorators(path.node);
        const props: PropPath[] = [];
        const elements = [];
        const computedPaths: NodePath<t.ClassProperty | t.ClassMethod>[] = [];
        const privateNames = new Set<string>();
        const body = path.get("body");

        for (const path of body.get("body")) {
          if (
            // check path.node.computed is enough, but ts will complain
            (path.isClassProperty() || path.isClassMethod()) &&
            path.node.computed
          ) {
            computedPaths.push(path);
          }

          if (path.isPrivate()) {
            const { name } = path.node.key.id;
            const getName = `get ${name}`;
            const setName = `set ${name}`;

            if (path.isClassPrivateMethod()) {
              if (path.node.kind === "get") {
                if (
                  privateNames.has(getName) ||
                  (privateNames.has(name) && !privateNames.has(setName))
                ) {
                  throw path.buildCodeFrameError("Duplicate private field");
                }
                privateNames.add(getName).add(name);
              } else if (path.node.kind === "set") {
                if (
                  privateNames.has(setName) ||
                  (privateNames.has(name) && !privateNames.has(getName))
                ) {
                  throw path.buildCodeFrameError("Duplicate private field");
                }
                privateNames.add(setName).add(name);
              }
            } else {
              if (
                (privateNames.has(name) &&
                  !privateNames.has(getName) &&
                  !privateNames.has(setName)) ||
                (privateNames.has(name) &&
                  (privateNames.has(getName) || privateNames.has(setName)))
              ) {
                throw path.buildCodeFrameError("Duplicate private field");
              }

              privateNames.add(name);
            }
          }

          if (path.isClassMethod({ kind: "constructor" })) {
            constructor = path;
          } else {
            elements.push(path);
            if (
              path.isProperty() ||
              path.isPrivate() ||
              path.isStaticBlock?.()
            ) {
              props.push(path as PropPath);
            }
          }
        }

        if (process.env.BABEL_8_BREAKING) {
          if (!props.length) return;
        } else {
          if (!props.length && !isDecorated) return;
        }

        const innerBinding = path.node.id;
        let ref: t.Identifier;
        if (!innerBinding || path.isClassExpression()) {
          nameFunction(path);
          ref = path.scope.generateUidIdentifier("class");
        } else {
          ref = t.cloneNode(path.node.id);
        }

        // NODE: These three functions don't support decorators yet,
        //       but verifyUsedFeatures throws if there are both
        //       decorators and private fields.
        const privateNamesMap = buildPrivateNamesMap(props);
        const privateNamesNodes = buildPrivateNamesNodes(
          privateNamesMap,
          privateFieldsAsProperties ?? loose,
          privateFieldsAsSymbols ?? false,
          file,
        );

        transformPrivateNamesUsage(
          ref,
          path,
          privateNamesMap,
          {
            privateFieldsAsProperties:
              privateFieldsAsSymbolsOrProperties ?? loose,
            noDocumentAll,
            innerBinding,
          },
          file,
        );

        let keysNodes: t.Statement[],
          staticNodes: t.Statement[],
          instanceNodes: t.Statement[],
          pureStaticNodes: t.FunctionDeclaration[],
          wrapClass: (path: NodePath<t.Class>) => NodePath;

        if (!process.env.BABEL_8_BREAKING) {
          if (isDecorated) {
            staticNodes = pureStaticNodes = keysNodes = [];
            ({ instanceNodes, wrapClass } = buildDecoratedClass(
              ref,
              path,
              elements,
              file,
            ));
          } else {
            keysNodes = extractComputedKeys(path, computedPaths, file);
            ({ staticNodes, pureStaticNodes, instanceNodes, wrapClass } =
              buildFieldsInitNodes(
                ref,
                path.node.superClass,
                props,
                privateNamesMap,
                file,
                setPublicClassFields ?? loose,
                privateFieldsAsSymbolsOrProperties ?? loose,
                constantSuper ?? loose,
                innerBinding,
              ));
          }
        } else {
          keysNodes = extractComputedKeys(path, computedPaths, file);
          ({ staticNodes, pureStaticNodes, instanceNodes, wrapClass } =
            buildFieldsInitNodes(
              ref,
              path.node.superClass,
              props,
              privateNamesMap,
              file,
              setPublicClassFields ?? loose,
              privateFieldsAsSymbolsOrProperties ?? loose,
              constantSuper ?? loose,
              innerBinding,
            ));
        }

        if (instanceNodes.length > 0) {
          injectInitialization(
            path,
            constructor,
            instanceNodes,
            (referenceVisitor, state) => {
              if (!process.env.BABEL_8_BREAKING) {
                if (isDecorated) return;
              }
              for (const prop of props) {
                // @ts-expect-error: TS doesn't infer that prop.node is not a StaticBlock
                if (t.isStaticBlock?.(prop.node) || prop.node.static) continue;
                prop.traverse(referenceVisitor, state);
              }
            },
          );
        }

        // rename to make ts happy
        const wrappedPath = wrapClass(path);
        wrappedPath.insertBefore([...privateNamesNodes, ...keysNodes]);
        if (staticNodes.length > 0) {
          wrappedPath.insertAfter(staticNodes);
        }
        if (pureStaticNodes.length > 0) {
          wrappedPath
            .find(parent => parent.isStatement() || parent.isDeclaration())
            .insertAfter(pureStaticNodes);
        }
      },

      ExportDefaultDeclaration(path, { file }) {
        if (!process.env.BABEL_8_BREAKING) {
          if (file.get(versionKey) !== PACKAGE_JSON.version) return;

          const decl = path.get("declaration");

          if (decl.isClassDeclaration() && hasDecorators(decl.node)) {
            if (decl.node.id) {
              // export default class Foo {}
              //   -->
              // class Foo {} export { Foo as default }
              splitExportDeclaration(path);
            } else {
              // @ts-expect-error Anonymous class declarations can be
              // transformed as if they were expressions
              decl.node.type = "ClassExpression";
            }
          }
        }
      },
    },
  };
}
