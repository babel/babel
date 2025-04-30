import { declare } from "@babel/helper-plugin-utils";
import {
  hasVoidPatternInVariableDeclaration,
  splitNamedDeclarationAsVarAndExport,
  transformVoidPattern,
  transformVoidPatternInLVal,
} from "./utils.ts";

export default declare(function ({ assertVersion }) {
  assertVersion(REQUIRED_VERSION("^7.27.0"));
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
        if (path.parentPath.isForXStatement()) return;
        for (const declarationPath of path.get("declarations")) {
          transformVoidPatternInLVal(declarationPath.get("id"));
        }
      },
    },
  };
});
