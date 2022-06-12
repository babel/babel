import { declare } from "@babel/helper-plugin-utils";
import annotateAsPure from "@babel/helper-annotate-as-pure";
import nameFunction from "@babel/helper-function-name";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import { types as t } from "@babel/core";
import globals from "globals";
import transformClass from "./transformClass";
import type { Visitor, NodePath } from "@babel/traverse";

const getBuiltinClasses = (category: keyof typeof globals) =>
  Object.keys(globals[category]).filter(name => /^[A-Z]/.test(name));

const builtinClasses = new Set([
  ...getBuiltinClasses("builtin"),
  ...getBuiltinClasses("browser"),
]);

export interface Options {
  loose?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(7);

  const { loose = false } = options;

  const setClassMethods = (api.assumption("setClassMethods") ??
    loose) as boolean;
  const constantSuper = (api.assumption("constantSuper") ?? loose) as boolean;
  const superIsCallableConstructor = (api.assumption(
    "superIsCallableConstructor",
  ) ?? loose) as boolean;
  const noClassCalls = (api.assumption("noClassCalls") ?? loose) as boolean;

  // todo: investigate traversal requeueing
  const VISITED = new WeakSet();

  return {
    name: "transform-classes",

    visitor: {
      ExportDefaultDeclaration(path) {
        if (!path.get("declaration").isClassDeclaration()) return;
        splitExportDeclaration(path);
      },

      ClassDeclaration(path) {
        const { node } = path;

        const ref = node.id || path.scope.generateUidIdentifier("class");

        path.replaceWith(
          t.variableDeclaration("let", [
            t.variableDeclarator(ref, t.toExpression(node)),
          ]),
        );
      },

      ClassExpression(path, state) {
        const { node } = path;
        if (VISITED.has(node)) return;

        const inferred = nameFunction(path);
        if (inferred && inferred !== node) {
          path.replaceWith(inferred);
          return;
        }

        VISITED.add(node);

        path.replaceWith(
          transformClass(path, state.file, builtinClasses, loose, {
            setClassMethods,
            constantSuper,
            superIsCallableConstructor,
            noClassCalls,
          }),
        );

        if (path.isCallExpression()) {
          annotateAsPure(path);
          // todo: improve babel types
          const callee = path.get("callee") as unknown as NodePath;
          if (callee.isArrowFunctionExpression()) {
            // This is an IIFE, so we don't need to worry about the noNewArrows assumption
            callee.arrowFunctionToExpression();
          }
        }
      },
    } as Visitor<any>,
  };
});
