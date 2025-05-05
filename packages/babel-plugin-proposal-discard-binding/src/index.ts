import { declare } from "@babel/helper-plugin-utils";
import {
  hasVoidPatternInVariableDeclaration,
  splitNamedDeclarationAsVarAndExport,
  removeTrailingVoidPatternsFromParams,
  transformVoidPattern,
  transformVoidPatternInLVal,
} from "./utils.ts";
import type { types as t, NodePath } from "@babel/core";

export default declare(function ({ assertVersion, assumption }) {
  assertVersion(REQUIRED_VERSION("^7.27.0"));
  const ignoreFunctionLength = assumption("ignoreFunctionLength");
  return {
    name: "proposal-discard-binding",
    manipulateOptions: (_, p) =>
      p.plugins.push(["discardBinding", { syntaxType: "void" }]),
    visitor: {
      ExportNamedDeclaration(path) {
        const declarationPath = path.get("declaration");
        if (!declarationPath.isVariableDeclaration()) return;
        // exit early if there is no void pattern in `export const ...`
        if (!hasVoidPatternInVariableDeclaration(declarationPath)) return;

        // Split the declaration and export list into two declarations so that the variable
        // declaration can be split up later without needing to worry about not being a
        // top-level statement.
        splitNamedDeclarationAsVarAndExport(path, declarationPath);
      },

      VoidPattern(path) {
        transformVoidPattern(path);
      },

      Function(path) {
        if (ignoreFunctionLength) {
          removeTrailingVoidPatternsFromParams(path);
        }
      },

      // The following visitors are introduced such that the
      // void pattern transform can run before parameters-destructuring
      // If void pattern reaches stage 4, consider export `transformVoidPattern`
      // and call `transformVoidPattern` in parameters-destructuring
      AssignmentExpression(path) {
        const leftPath = path.get("left");
        if (leftPath.isLVal()) {
          transformVoidPatternInLVal(leftPath);
        }
        // leftPath is an optional member expression, valid in optionalChainingAssign
      },

      VariableDeclaration(path) {
        for (const declarationPath of path.get("declarations")) {
          transformVoidPatternInLVal(declarationPath.get("id"));
        }
      },

      // The following visitors are introduced such that the
      // void pattern transform can run before explicit-resource-management
      // If void pattern reaches stage 4, consider export `transformVoidPattern`
      // and call `transformVoidPattern` in explicit-resource-management
      "BlockStatement|StaticBlock"(
        path: NodePath<t.BlockStatement | t.StaticBlock>,
      ) {
        for (const statementPath of path.get("body")) {
          if (statementPath.isVariableDeclaration()) {
            const kind = statementPath.node.kind;
            if (kind === "using" || kind === "await using") {
              for (const declarationPath of statementPath.get("declarations")) {
                transformVoidPatternInLVal(declarationPath.get("id"));
              }
            }
          }
        }
      },
    },
  };
});
