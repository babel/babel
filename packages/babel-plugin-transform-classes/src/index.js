import LooseTransformer from "./loose";
import VanillaTransformer from "./vanilla";
import nameFunction from "@babel/helper-function-name";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import { types as t } from "@babel/core";
import { builtinClasses } from "@babel/lists";

const finalizeTransformedClass = path => {
  if (path.isCallExpression()) {
    if (path.get("callee").isArrowFunctionExpression()) {
      path.get("callee").arrowFunctionToExpression();
    }
  }
};

export default function(api, options) {
  const { loose, assumePure: _assumePure } = options;
  const Transformer = loose ? LooseTransformer : VanillaTransformer;
  let assumePure;
  if (typeof _assumePure === "boolean") {
    assumePure = _assumePure;
  } else if (typeof _assumePure === "undefined") {
    assumePure = !!loose;
  } else {
    throw new Error("assumePure option must be a boolean or undefined.");
  }

  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        if (!path.get("declaration").isClassDeclaration()) return;
        splitExportDeclaration(path);
      },

      ClassDeclaration(path, state) {
        const { node } = path;

        const transformed = new Transformer(
          path,
          state.file,
          builtinClasses,
          assumePure,
        ).run();

        if (Array.isArray(transformed)) {
          path.replaceWithMultiple(transformed);
        } else {
          path.replaceWith(
            t.variableDeclaration("let", [
              t.variableDeclarator(node.id, transformed),
            ]),
          );
          finalizeTransformedClass(path.get("declarations.0.init"));
        }
      },

      ClassExpression(path, state) {
        const { node } = path;

        const inferred = nameFunction(path);
        if (inferred && inferred !== node) {
          path.replaceWith(inferred);
          return;
        }

        const transformed = new Transformer(
          path,
          state.file,
          builtinClasses,
          assumePure,
        ).run();

        if (Array.isArray(transformed)) {
          // inline into class iife
          transformed
            .reverse()
            .forEach(statement => path.insertAfter(statement));

          path.remove();
        } else {
          path.replaceWith(transformed);
          finalizeTransformedClass(path);
        }
      },
    },
  };
}
