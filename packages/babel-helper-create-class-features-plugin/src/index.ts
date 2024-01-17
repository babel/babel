import { types as t } from "@babel/core";
import type { PluginAPI, PluginObject } from "@babel/core";
import type { NodePath } from "@babel/traverse";
import nameFunction from "@babel/helper-function-name";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import createDecoratorTransform from "./decorators.ts";

import semver from "semver";

import {
  buildPrivateNamesNodes,
  buildPrivateNamesMap,
  transformPrivateNamesUsage,
  buildFieldsInitNodes,
  buildCheckInRHS,
} from "./fields.ts";
import type { PropPath } from "./fields.ts";
import { buildDecoratedClass, hasDecorators } from "./decorators-2018-09.ts";
import { injectInitialization, extractComputedKeys } from "./misc.ts";
import {
  enableFeature,
  FEATURES,
  isLoose,
  shouldTransform,
} from "./features.ts";
import { assertFieldTransformed } from "./typescript.ts";

export { FEATURES, enableFeature, injectInitialization, buildCheckInRHS };

const versionKey = "@babel/plugin-class-features/version";

interface Options {
  name: string;
  feature: number;
  loose?: boolean;
  inherits?: PluginObject["inherits"];
  manipulateOptions?: PluginObject["manipulateOptions"];
  api?: PluginAPI;
  decoratorVersion?: "2023-05" | "2023-01" | "2022-03" | "2021-12" | "2018-09";
}

export function createClassFeaturePlugin({
  name,
  feature,
  loose,
  manipulateOptions,
  api,
  inherits,
  decoratorVersion,
}: Options): PluginObject {
  if (feature & FEATURES.decorators) {
    if (process.env.BABEL_8_BREAKING) {
      return createDecoratorTransform(api, { loose }, "2023-05", inherits);
    } else {
      if (
        decoratorVersion === "2021-12" ||
        decoratorVersion === "2022-03" ||
        decoratorVersion === "2023-01" ||
        decoratorVersion === "2023-05"
      ) {
        return createDecoratorTransform(
          api,
          { loose },
          decoratorVersion,
          inherits,
        );
      }
    }
  }
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

        const pathIsClassDeclaration = path.isClassDeclaration();

        if (pathIsClassDeclaration) assertFieldTransformed(path);

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
        let ref: t.Identifier | null;
        if (!innerBinding || !pathIsClassDeclaration) {
          nameFunction(path);
          ref = path.scope.generateUidIdentifier(innerBinding?.name || "Class");
        }
        const classRefForDefine = ref ?? t.cloneNode(innerBinding);

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
          classRefForDefine,
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
          instanceNodes: t.ExpressionStatement[],
          lastInstanceNodeReturnsThis: boolean,
          pureStaticNodes: t.FunctionDeclaration[],
          classBindingNode: t.Statement | null,
          wrapClass: (path: NodePath<t.Class>) => NodePath;

        if (!process.env.BABEL_8_BREAKING) {
          if (isDecorated) {
            staticNodes = pureStaticNodes = keysNodes = [];
            ({ instanceNodes, wrapClass } = buildDecoratedClass(
              classRefForDefine,
              path,
              elements,
              file,
            ));
          } else {
            keysNodes = extractComputedKeys(path, computedPaths, file);
            ({
              staticNodes,
              pureStaticNodes,
              instanceNodes,
              lastInstanceNodeReturnsThis,
              classBindingNode,
              wrapClass,
            } = buildFieldsInitNodes(
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
          ({
            staticNodes,
            pureStaticNodes,
            instanceNodes,
            lastInstanceNodeReturnsThis,
            classBindingNode,
            wrapClass,
          } = buildFieldsInitNodes(
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
            lastInstanceNodeReturnsThis,
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
        if (classBindingNode != null && pathIsClassDeclaration) {
          wrappedPath.insertAfter(classBindingNode);
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
