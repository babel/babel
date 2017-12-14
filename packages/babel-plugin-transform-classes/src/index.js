import LooseTransformer from "./loose";
import VanillaTransformer from "./vanilla";
import annotateAsPure from "@babel/helper-annotate-as-pure";
import nameFunction from "@babel/helper-function-name";
import { types as t } from "@babel/core";

export default function(api, options) {
  const { loose, builtins } = options;
  const Constructor = loose ? LooseTransformer : VanillaTransformer;

  let customBuiltins;
  if (builtins !== void 0) {
    if (!Array.isArray(builtins)) {
      throw new Error(".builtins must be an array.");
    }
    if (builtins.some(s => typeof s !== "string")) {
      throw new Error(".builtins must be an array of strings.");
    }
    customBuiltins = new Set(builtins);
  } else {
    customBuiltins = new Set();
  }

  // todo: investigate traversal requeueing
  const VISITED = Symbol();

  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        if (!path.get("declaration").isClassDeclaration()) return;

        const { node } = path;
        const ref =
          node.declaration.id || path.scope.generateUidIdentifier("class");
        node.declaration.id = ref;

        // Split the class declaration and the export into two separate statements.
        path.replaceWith(node.declaration);
        path.insertAfter(
          t.exportNamedDeclaration(null, [
            t.exportSpecifier(ref, t.identifier("default")),
          ]),
        );
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
          new Constructor(path, state.file, customBuiltins).run(),
        );

        if (path.isCallExpression()) {
          annotateAsPure(path);
          if (path.get("callee").isArrowFunctionExpression()) {
            path.get("callee").arrowFunctionToExpression();
          }
        }
      },
    },
  };
}
