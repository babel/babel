import { declare } from "@babel/helper-plugin-utils";
import annotateAsPure from "@babel/helper-annotate-as-pure";
import nameFunction from "@babel/helper-function-name";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import { types as t } from "@babel/core";
import globals from "globals";
import transformClass from "./transformClass";
import type { Visitor, NodePath } from "@babel/traverse";

const getBuiltinClasses = category =>
  Object.keys(globals[category]).filter(name => /^[A-Z]/.test(name));

const builtinClasses = new Set([
  ...getBuiltinClasses("builtin"),
  ...getBuiltinClasses("browser"),
]);

export default declare((api, options) => {
  api.assertVersion(7);

  const { loose } = options;

  const setClassMethods = api.assumption("setClassMethods") ?? options.loose;
  const constantSuper = api.assumption("constantSuper") ?? options.loose;
  const superIsCallableConstructor =
    api.assumption("superIsCallableConstructor") ?? options.loose;
  const noClassCalls = api.assumption("noClassCalls") ?? options.loose;

  // todo: investigate traversal requeueing
  const VISITED = Symbol();

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
        if (node[VISITED]) return;

        const inferred = nameFunction(path);
        if (inferred && inferred !== node) {
          path.replaceWith(inferred);
          return;
        }

        node[VISITED] = true;

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
